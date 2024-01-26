import { stringify } from 'query-string';
import { fetchUtils, HttpError } from 'react-admin';
import { Observable } from 'rxjs';
import { fetchEventSource } from '@microsoft/fetch-event-source';
import type { Identifier } from 'react-admin';
// import simpleRestProvider from 'ra-data-simple-rest';
import jsonServerProvider from "ra-data-json-server";

import { FatalError, RetriableError } from './customError';
import { CrawlerItem, PushItem, ClearPushResDto } from '../interfaces';

export const httpClient = async (url: string, options: fetchUtils.Options = {}) => {
    const token = localStorage.getItem(`${import.meta.env.VITE_APP_COOKIE_PREFIX}token`);

    const customHeaders = (options.headers ||
        new Headers({
            Accept: 'application/json',
            ['Access-Control-Allow-Origin']: '*',
        })) as Headers;
    
    let user: any
    if (token) {
        user = { token: `Bearer ${token}`, authenticated: !!token };
    }

    const { status, headers, body, json } = await fetchUtils.fetchJson(url, {
        ...options,
        headers: customHeaders,
        user
    });
    // console.log('fetchJson result', { status, headers, body, json });
    return { status, headers, body, json };
}

export const baseDataProvider = jsonServerProvider(import.meta.env.VITE_SERVER_HOST, httpClient);


function buildEndPoint(endPoint: string) {
    let endUrlPoint = `${import.meta.env.VITE_SERVER_HOST}/${endPoint}`;
    if (!endUrlPoint.startsWith('http')) {
        // 获取当前的协议
        const currentProtocol = window.location.protocol;
        endUrlPoint = `${currentProtocol}${endUrlPoint}`;
    }
    return endUrlPoint;
}

export const dataProvider = {
    ...baseDataProvider,
    create: async (resource: string, params: any) => {
        const endUrlPoint = buildEndPoint(resource);

        try {
            const { json } = await httpClient(endUrlPoint, {
                method: 'POST',
                body: JSON.stringify(params.data),
            })
            return {
                data: { ...params.data, id: json.id } as any,
            };
        } catch (error) {
            if (error instanceof HttpError) {
                console.log('err with create', error.body);
                const errorMsg = error.body.errors?.[0] || error.body?.message;

                throw new HttpError(errorMsg, error.body.statusCode, {})
                
            }
        }
    },
    getMany: (resource: string, params: any) => {
        const endUrlPoint = buildEndPoint(resource);

        let query = {};

        if (params.ids.length > 1) {
            query = {
                ids: params.ids,
            };
        } else {
            query = {
                id: params.ids[0],
            }
        }
    
        const url = `${endUrlPoint}?${stringify(query, { arrayFormat: 'comma' })}`;
        return httpClient(url).then(({ json }) => ({ data: json }));
    },
    getDiskFiles: async (kbId: Identifier, subDir?: string) => {

        const endUrlPoint = buildEndPoint(`kbs/${kbId}/diskFiles`);
        const queryParams = {
            subDir: subDir || '',
            isRecursion: 'true'
        };
        const url = new URL(endUrlPoint);
        const params = new URLSearchParams(queryParams);
        url.search = params.toString();
        // 最后的url
        const finalUrl = url.toString();
        const { json: files } = await httpClient(finalUrl, {
            method: 'GET',
        });

        return files;
    },
    startCrawler: (kbId: Identifier, siteId: Identifier, data: any): Observable<CrawlerItem> => {
        const endUrlPoint = buildEndPoint(`kbs/${kbId}/site/${siteId}/crawler`);
        const token = localStorage.getItem(`${import.meta.env.VITE_APP_COOKIE_PREFIX}token`);

        const ctrl = new AbortController();

        const observable = new Observable<CrawlerItem>(subscriber => {
            
            fetchEventSource(endUrlPoint, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    ['Content-Type']: 'application/json',
                    ['Access-Control-Allow-Origin']: '*',
                    token: `Bearer ${token}`
                },
                body: JSON.stringify(data),
                signal: ctrl.signal,
                async onopen(response) {
                    if (response.ok) {
                        return; // everything's good
                    } else if (response.status >= 400 && response.status < 500 && response.status !== 429) {
                        // client-side errors are usually non-retriable:
                        throw new Error('Client error');
                    } else {
                        // ctrl.abort();
                        throw new RetriableError();
                    }
                },
                onmessage(msg) {
                    // if the server emits an error message, throw an exception
                    // so it gets handled by the onerror callback below:
                    if (msg.event === 'FatalError') {
                        throw new FatalError(msg.data);
                    }
                    if (!msg.data) {
                        return;
                    }

                    try {
                        const jsonData = JSON.parse(msg.data) as CrawlerItem;
                        subscriber.next(jsonData);
                        
                        if (jsonData.finish) {
                            subscriber.complete();
                            ctrl.abort();
                        }
                    } catch (error) {
                        throw new FatalError('json parsing error');
                    }

                },
                onclose() {
                    // ctrl.abort();
                    // if the server closes the connection unexpectedly, retry:
                    throw new RetriableError();
                },
                onerror(err) {
                    if (err instanceof FatalError) {
                        // ctrl.abort();
                        throw err; // rethrow to stop the operation
                    } else {
                        // do nothing to automatically retry. You can also
                        // return a specific retry interval here.
                    }
                }
            });

        });

        return observable;
    },
    kbUpload: async (kbId: Identifier, body: any) => {
        const endUrlPoint = buildEndPoint(`kbs/${kbId}/upload`);

        const rawFiles: File[] =  body.files.map((item: any) => item.rawFile)
        
        const formData = new FormData();
        rawFiles.forEach((file) => {
            formData.append('files', file);
        });

        const result = await httpClient(endUrlPoint, {
            method: 'POST',
            body: formData,
        })
        
        
        return result;
    },
    kbRemoveDiskFiles: async (kbId: Identifier, filePath: string) => {
        const endUrlPoint = buildEndPoint(`kbs/${kbId}/removeDiskFiles`);
        const { json: files } = await httpClient(endUrlPoint, {
            method: 'POST',
            body: JSON.stringify({ filePaths: [filePath] }),
        });

        return files;
    },
    crawlerSinglePage: async (kbId: Identifier, siteId: Identifier, fileId: Identifier): Promise<CrawlerItem> => {
        const endUrlPoint = buildEndPoint(`kbs/${kbId}/site/${siteId}/crawler/${fileId}`);
        const { json: result } = await httpClient(endUrlPoint, {
            method: 'PUT',
        });

        return result;
    },

    runPush: (pushConfigId: Identifier, pushVersion: string): Observable<PushItem> => {
        const endUrlPoint = buildEndPoint(`push/${pushConfigId}/run`);
        const token = localStorage.getItem(`${import.meta.env.VITE_APP_COOKIE_PREFIX}token`);

        const ctrl = new AbortController();

        const observable = new Observable<PushItem>(subscriber => {

            fetchEventSource(endUrlPoint, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    ['Content-Type']: 'application/json',
                    ['Access-Control-Allow-Origin']: '*',
                    token: `Bearer ${token}`
                },
                body: JSON.stringify({ pushVersion }),
                signal: ctrl.signal,
                async onopen(response) {
                    if (response.ok) {
                        return; // everything's good
                    } else if (response.status >= 400 && response.status < 500 && response.status !== 429) {
                        // client-side errors are usually non-retriable:
                        throw new Error('Client error');
                    } else {
                        ctrl.abort();
                        throw new RetriableError();
                    }
                },
                onmessage(msg) {
                    // if the server emits an error message, throw an exception
                    // so it gets handled by the onerror callback below:
                    if (msg.event === 'FatalError') {
                        throw new FatalError(msg.data);
                    }
                    if (!msg.data) {
                        return;
                    }

                    try {
                        const jsonData = JSON.parse(msg.data) as PushItem;
                        subscriber.next(jsonData);

                        if (jsonData.finish) {
                            subscriber.complete();
                            ctrl.abort();
                        }
                    } catch (error) {
                        throw new FatalError('json parsing error');
                    }

                },
                onclose() {
                    ctrl.abort();
                    throw new RetriableError();
                },
                onerror(err) {
                    if (err instanceof FatalError) {
                        ctrl.abort();
                        throw err; 
                    } else {
                        // do nothing to automatically retry. You can also
                        // return a specific retry interval here.
                    }
                }
            });

        });

        return observable;
    },
    runSiglePush: async (pushConfigId: Identifier, fileId: Identifier) => {
        const endUrlPoint = buildEndPoint(`push/${pushConfigId}/run/${fileId}`);

        const { json: result } = await httpClient(endUrlPoint, {
            method: 'POST',
        });

        return result;
    },
    clearAllPushMap: async (pushConfigId: Identifier, pushVersion: string): Promise<ClearPushResDto> => {
        const endUrlPoint = buildEndPoint(`push/${pushConfigId}/clearAll`);

        const { json: result } = await httpClient(endUrlPoint, {
            method: 'DELETE',
            body: JSON.stringify({ pushVersion }),
        });

        return result as ClearPushResDto;
    },
    clearSiglePushMapWithFileId: async (pushConfigId: Identifier, fileId: Identifier) => {
        const endUrlPoint = buildEndPoint(`push/${pushConfigId}/clear/${fileId}`);

        const { json: result } = await httpClient(endUrlPoint, {
            method: 'DELETE',
        });

        return result;
    },

}



