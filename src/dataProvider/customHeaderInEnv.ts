
const customHeaders: {[key: string] : any } = {}

if (import.meta.env.MODE !== 'production') {
    customHeaders['Access-Control-Allow-Origin'] = '*'
}

export const customHeadersInEnv = customHeaders;
