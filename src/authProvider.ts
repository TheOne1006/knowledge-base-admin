// in src/authProvider.ts
import { AuthProvider } from "react-admin";
import { httpClient } from './dataProvider';

export const authProvider: AuthProvider = {
    // called when the user attempts to log in
    login: async ({ username, password }) => {
        const loginUrl = `${import.meta.env.VITE_SERVER_HOST}/${import.meta.env.VITE_SERVER_USER_LOGIN_ENDPOINT}`;
        // post to  loginUrl with payload
        const { json } = await httpClient(loginUrl, {
            method: 'POST',
            body: JSON.stringify({ username, password }),
        });
        localStorage.setItem(`${import.meta.env.VITE_APP_COOKIE_PREFIX}token`, json.token);
        localStorage.setItem(`${import.meta.env.VITE_APP_COOKIE_PREFIX}roles`, json.roles.join(','));
        return Promise.resolve(json.token);
    },
    // called when the user clicks on the logout button
    logout: () => {
        localStorage.removeItem(`${import.meta.env.VITE_APP_COOKIE_PREFIX}token`);
        return Promise.resolve();
    },
    // called when the API returns an error
    checkError: ({ status }: { status: number }) => {
        if (status === 401 || status === 403) {
            // localStorage.removeItem(`${import.meta.env.VITE_APP_COOKIE_PREFIX}token`);
            // localStorage.removeItem(`${import.meta.env.VITE_APP_COOKIE_PREFIX}roles`);
            return Promise.reject();
        }
        return Promise.resolve();
    },
    // called when the user navigates to a new location, to check for authentication
    checkAuth: async () => {
        const checkUrl = `${import.meta.env.VITE_SERVER_HOST}/${import.meta.env.VITE_SERVER_USER_CHECK_ENDPOINT}`;

        const { json } = await httpClient(checkUrl, {
            method: 'GET',
        });
        localStorage.setItem(`${import.meta.env.VITE_APP_COOKIE_PREFIX}roles`, json.roles.join(','));

        return json.id
            ? Promise.resolve()
            : Promise.reject();
    },
    // called when the user navigates to a new location, to check for permissions / roles
    getPermissions: () => Promise.resolve(),
};
