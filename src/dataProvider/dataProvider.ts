import { stringify } from 'query-string';
import { fetchUtils, HttpError } from 'react-admin';
import { Observable } from 'rxjs';
import type { Identifier } from 'react-admin';
// import simpleRestProvider from 'ra-data-simple-rest';
import jsonServerProvider from "ra-data-json-server";

import { CrawlerItem, PushItem, ClearPushResDto } from '../interfaces';
import { postSse } from './fetchsse';
import { customHeadersInEnv } from './customHeaderInEnv';

export const httpClient = async (url: string, options: fetchUtils.Options = {}) => {
    const token = localStorage.getItem(`${import.meta.env.VITE_APP_COOKIE_PREFIX}token`);

    const customHeaders = (options.headers ||
        new Headers({
            ...customHeadersInEnv,
            Accept: 'application/json',
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
    // if (!endUrlPoint.startsWith('http')) {
        // 获取当前的协议
    //     const currentProtocol = window.location.protocol;
    //     endUrlPoint = `${currentProtocol}${endUrlPoint}`;
    // }
    return endUrlPoint;
}

export const dataProvider = {
    ...baseDataProvider,
    create: async (resource: string, params: any): Promise<any> => {
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

        const queryParams = {
            subDir: subDir || '',
            isRecursion: 'true'
        };
        const endUrlPoint = buildEndPoint(`kbs/${kbId}/diskFiles`);

        const url = `${endUrlPoint}?${stringify(queryParams)}`;
        const { json: files } = await httpClient(url, {
            method: 'GET',
        });

        return files;
    },
    startCrawler: async (kbId: Identifier, siteId: Identifier, data: any, ctrl: AbortController): Promise<Observable<CrawlerItem>> => {
        const endUrlPoint = buildEndPoint(`kbs/${kbId}/site/${siteId}/crawler`);
        const token = localStorage.getItem(`${import.meta.env.VITE_APP_COOKIE_PREFIX}token`);
        return postSse(endUrlPoint, token, data, ctrl);
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

    runPush: async (pushConfigId: Identifier, pushVersion: string, ctrl: AbortController): Promise<Observable<PushItem>> => {
        const endUrlPoint = buildEndPoint(`push/${pushConfigId}/run`);
        const token = localStorage.getItem(`${import.meta.env.VITE_APP_COOKIE_PREFIX}token`);

        return postSse<PushItem>(endUrlPoint, token, { pushVersion }, ctrl);
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



