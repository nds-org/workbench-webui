import {V1} from "../common";
import {UserState} from "./store";

export const TOGGLE_DARKTHEME = "TOGGLE_DARKTHEME";
export const SET_ENV = "SET_ENV";
export const SET_TOKEN = "SET_TOKEN";
export const RESET_TOKEN = "RESET_TOKEN";
export const SET_USER = "SET_USER";
export const RESET_USER = "RESET_USER";

// TODO: Server data
export const STACK_CREATE = "STACK_CREATE";
export const STACK_RETRIEVE = "STACK_RETRIEVE";
export const STACK_UPDATE = "STACK_UPDATE";
export const STACK_DELETE = "STACK_DELETE";

export const SPEC_CREATE = "SPEC_CREATE";
export const SPEC_UPDATE = "SPEC_UPDATE";
export const SPEC_DELETE = "SPEC_DELETE";


export interface AuthPayload {
    user?: UserState;
    token?: string;
}

export interface EnvPayload {
    env: any;
}
export interface StackPayload {
    stack: V1.Stack;
}

export const toggleDarkTheme = () => ({
    type: TOGGLE_DARKTHEME,
});

export const setEnv = (payload: EnvPayload) => ({
    type: SET_ENV,
    payload
});

export const setToken = (payload: AuthPayload) => ({
    type: SET_TOKEN,
    payload
});

export const setUser = (payload: AuthPayload) => ({
    type: SET_USER,
    payload
});


export const resetToken = () => ({
    type: RESET_TOKEN,
});
export const resetUser = () => ({
    type: RESET_USER,
});

export const stackCreate = (payload: StackPayload) => ({
    type: STACK_CREATE,
    payload
});

export const stackRetrieve = () => ({
    type: STACK_RETRIEVE
});

export const stackUpdate = (payload: StackPayload) => ({
    type: STACK_UPDATE,
    payload
});

export const stackDelete = (payload: StackPayload) => ({
    type: STACK_DELETE,
    payload
});
