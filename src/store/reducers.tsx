import * as actions from "./actions";
import { combineReducers } from "redux";

interface PreferencesPayload {
    darkThemeEnabled: boolean;
}

interface AuthPayload {
    username: string;
    token: string;
}

interface Action<T> {
    type: string;
    payload: T;
}

const DEFAULT_VALUE = '';

const preferences = (state = { darkThemeEnabled: false }, action: Action<PreferencesPayload>) => {
    switch (action.type) {
        case actions.TOGGLE_DARKTHEME:
            return { ...state, darkThemeEnabled: !state.darkThemeEnabled };

        default:
            return state;
    }
};

const auth = (state = { token: DEFAULT_VALUE, username: DEFAULT_VALUE }, action: Action<AuthPayload>) => {
    switch (action.type) {
        case actions.SET_AUTH:
            return { ...state, token: action.payload.token, username: action.payload.username };

        case actions.RESET_AUTH:
            return { ...state, token: DEFAULT_VALUE, username: DEFAULT_VALUE};


        default:
            return state;
    }
};

export default combineReducers({ preferences, auth });
