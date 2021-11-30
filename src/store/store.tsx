import { createStore } from "redux";
import rootReducer from "./reducers";
import {V1, V2} from "../common";

// TODO: Restructure env?
export interface Env {
    product?: {
        name: string;
        // ...
    };

    // TODO: Handle this with permissions instead
    advancedFeatures?: any;
}

export interface AppState {
    preferences: {
        darkThemeEnabled : boolean;
    };
    auth: {
        token: string;
        username: string;
    };
    env: any;
    /*serverData: {
        stacks: Array<V1.Stack>;
        specs: Array<V1.Service>;
    }*/
}

// TODO: Set from env

// Populate initial state from localStorage
const authStorageKey = "auth";
const persistedAuth = localStorage.getItem(authStorageKey);
const themeStorageKey = "theme";
const persistedTheme = localStorage.getItem(themeStorageKey);
const initState: AppState = {
    preferences: persistedTheme ? JSON.parse(persistedTheme) : { darkThemeEnabled: false },
    auth: persistedAuth ? JSON.parse(persistedAuth) : { token: '', username: '' },
    //serverData: { stacks: [], specs: [] },
    env: {}, // fetchEnv(),
};

if (initState.auth && initState.auth.token) {
    V1.OpenAPI.TOKEN = V2.OpenAPI.TOKEN = initState.auth.token;
}

const store = createStore(rootReducer, initState);

store.subscribe(() => {
    const preferences = store.getState().preferences;
    if (preferences) {
        localStorage.setItem(themeStorageKey, JSON.stringify(preferences));
    }
    const auth = store.getState().auth;
    if (auth) {
        localStorage.setItem(authStorageKey, JSON.stringify(auth));
        auth.token && (V1.OpenAPI.TOKEN = V2.OpenAPI.TOKEN = auth.token);
    }
    const env = store.getState().env;
    if (env?.auth?.baseUrl) {
        // TODO: Set from env
        const host = env?.auth?.baseUrl;
        V1.OpenAPI.BASE = V2.OpenAPI.BASE = `${host}/api`;
    }
});

export default store;
