import { createStore } from 'redux';

import {Account} from "../common/services/openapi/v1";
import Cookies from 'universal-cookie';
import {V1} from "../common/services";


import rootReducer from './reducers'

// Set auth cookie
const cookies = new Cookies();

const store = createStore(rootReducer);

interface AppState {
    token?: string;
    username?: string;
    user?: Account;
}

const state: AppState = {
    token: cookies.get('token') || '',
    username: cookies.get('username') || '',
    user: undefined
}

const fetchUser = (username: string, token: string) => {
    V1.UserAccountService.getAccountById(username).then(account => {
        state.user = account;
        cookies.set('user', JSON.stringify(account));
    }).catch(reason => {
        console.error(`Failed to fetch user ${username} with token: `, reason);

        // Clear out (stale) auth cookies
        cookies.remove('token');
        cookies.remove('username');
        cookies.remove('user');
    });
}

if (state.token && state.username && !(state.user && state.user.namespace)) {
    const username = state.username;
    const token = state.token;

    if (!state.user) {
        // Attempt to fetch user account
        fetchUser(username, token);
    }
}

export type { AppState };
export { state, fetchUser, store };

