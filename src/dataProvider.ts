import { fetchUtils } from 'react-admin';
import type { Identifier } from 'react-admin';
// import simpleRestProvider from 'ra-data-simple-rest';
import jsonServerProvider from "ra-data-json-server";

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
    console.log('fetchJson result', { status, headers, body, json });
    return { status, headers, body, json };
}

export const baseDataProvider = jsonServerProvider(import.meta.env.VITE_SERVER_HOST, httpClient);



export const dataProvider = {
    ...baseDataProvider,
    getDiskFiles: async (bkId: Identifier, subDir?: string) => {

        let endUrlPoint = `${import.meta.env.VITE_SERVER_HOST}/kbs/${bkId}/diskFiles`;
        if (!endUrlPoint.startsWith('http')) {
            // 获取当前的协议
            const currentProtocol = window.location.protocol;
            endUrlPoint = `${currentProtocol}${endUrlPoint}`;
        }

        const queryParams = {
            subDir: subDir || '',
            isRecursion: 'true'
        };

        console.log('endUrlPoint:', endUrlPoint)
        const url = new URL(endUrlPoint);
        const params = new URLSearchParams(queryParams);
        url.search = params.toString();
        // 最后的url
        const finalUrl = url.toString();
        const { json: files } = await httpClient(finalUrl, {
            method: 'GET',
        });

        console.log('files>>');
        console.log(files);

        return files;
    }
}



