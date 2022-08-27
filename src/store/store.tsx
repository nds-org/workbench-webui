import { createStore } from "redux";
import rootReducer from "./reducers";
import {V1, V2} from "../common";
import {AuthPayload} from "./actions";

export interface UserState { email: string; username: string; groups: Array<string> }

// TODO: Restructure env?
export interface Env {
    product?: {
        name: string;
        // ...
    };
    domain?: string;
    // TODO: Handle this with permissions instead
    advancedFeatures?: any;
}

export interface AppState {
    preferences: {
        darkThemeEnabled : boolean;
    };
    auth: AuthPayload;
    env: Env;
    /*serverData: {
        stacks: Array<V1.Stack>;
        specs: Array<V1.Service>;
    }*/
}

// TODO: Set from env

// Populate initial state from localStorage
const themeStorageKey = "theme";
const persistedTheme = localStorage.getItem(themeStorageKey);

const initState: AppState = {
    preferences: persistedTheme ? JSON.parse(persistedTheme) : { darkThemeEnabled: false },
    auth: { token: undefined, user: undefined },
    //serverData: { stacks: [], specs: [] },
    env: { domain: 'https://kubernetes.docker.internal' }, // fetchEnv(),
};

const store = createStore(rootReducer, initState);

store.subscribe(() => {
    const state = store.getState();
    console.log('New Store State: ', state);

    const preferences = state.preferences;
    if (preferences) {
        localStorage.setItem(themeStorageKey, JSON.stringify(preferences));
    }
    console.log("Auth changed? ", state.auth);
    const env = state.env;
    if (env?.domain) {
        // TODO: Set from env
        const host = env?.domain;
        V1.OpenAPI.BASE = `${host}/api/v1`;
        V2.OpenAPI.BASE = `${host}/api/v2`;
    }
});

export default store;
