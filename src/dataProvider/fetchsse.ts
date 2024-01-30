import { Observable } from 'rxjs';
import { fetchEventSource } from '@microsoft/fetch-event-source';

import { FatalError, RetriableError } from './customError';
import { customHeadersInEnv } from './customHeaderInEnv';

interface BaseT {
    finish: boolean;
    [key: string]: any;
}

export async function postSse<T extends BaseT>(
    url: string, 
    token: string | null, 
    data: any,
    ctrl: AbortController,
    ): Promise<Observable<T>> {
    // const ctrl = new AbortController();
    const observable = new Observable<T>(subscriber => {

        fetchEventSource(url, {
            method: 'POST',
            openWhenHidden: true,
            signal: ctrl.signal,
            headers: {
                // Accept: 'application/json',
                ...customHeadersInEnv,
                ['Content-Type']: 'application/json',
                token: `Bearer ${token}`
            },
            body: JSON.stringify(data),
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
                    const jsonData = JSON.parse(msg.data) as T;
                    subscriber.next(jsonData);

                    if (jsonData.finish) {
                        ctrl.abort();
                        subscriber.complete();
                    }
                } catch (error) {
                    throw new FatalError(`json parsing error, with ${msg.data}`);
                }

            },
            onclose() {
                ctrl.abort();
                // if the server closes the connection unexpectedly, retry:
                throw new RetriableError();
            },
            onerror(err) {
                if (err instanceof FatalError) {
                    throw err; // rethrow to stop the operation
                } else {
                    // do nothing to automatically retry. You can also
                    // return a specific retry interval here.
                }
            }
        });

    });

    return Promise.resolve(observable);
}
