import { fetchUtils } from 'react-admin';
// import simpleRestProvider from 'ra-data-simple-rest';
import jsonServerProvider from "ra-data-json-server";

export const httpClient = async (url: string, options: fetchUtils.Options = {}) => {
    const token = localStorage.getItem(`${import.meta.env.VITE_APP_COOKIE_PREFIX}token`);

    // const customHeaders = (options.headers ||
    //     new Headers({
    //         Accept: 'application/json',
    //         ['Access-Control-Allow-Origin']: '*',
    //     })) as Headers;
    
    let user: any
    if (token) {
        user = { token: `Bearer ${token}`, authenticated: !!token };
    }

    const { status, headers, body, json } = await fetchUtils.fetchJson(url, {
        ...options,
        // headers: customHeaders,
        user
    });
    console.log('fetchJson result', { status, headers, body, json });
    return { status, headers, body, json };
}

export const dataProvider = jsonServerProvider("http://localhost:3000/v1", httpClient);
