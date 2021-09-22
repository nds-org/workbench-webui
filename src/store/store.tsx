import { createStore } from "redux";
import rootReducer from "./reducers";
import {V1, V2} from "../common";


const authStorageKey = "auth";
const persistedAuth = localStorage.getItem(authStorageKey);

const themeStorageKey = "theme";
const persistedTheme = localStorage.getItem(themeStorageKey);

const DEFAULT_VALUE = '';

export interface AppState {
    preferences: {
        darkThemeEnabled : boolean;
    };
    auth: {
        token: string;
        username: string;
    };
}

const initState: AppState = {
    preferences: persistedTheme ? JSON.parse(persistedTheme) : { darkThemeEnabled: false },
    auth: persistedAuth ? JSON.parse(persistedAuth) : { token: DEFAULT_VALUE, username: DEFAULT_VALUE },
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
});

export default store;
