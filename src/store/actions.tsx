import {V1} from "../common";

export const TOGGLE_DARKTHEME = "TOGGLE_DARKTHEME";
export const SET_ENV = "SET_ENV";
export const SET_AUTH = "SET_AUTH";
export const RESET_AUTH = "RESET_AUTH";

// TODO: Server data
export const STACK_CREATE = "STACK_CREATE";
export const STACK_RETRIEVE = "STACK_RETRIEVE";
export const STACK_UPDATE = "STACK_UPDATE";
export const STACK_DELETE = "STACK_DELETE";

export const SPEC_CREATE = "SPEC_CREATE";
export const SPEC_UPDATE = "SPEC_UPDATE";
export const SPEC_DELETE = "SPEC_DELETE";


export interface AuthPayload {
    username: string;
    token: string;
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

export const setAuth = (payload: AuthPayload) => ({
    type: SET_AUTH,
    payload
});

export const resetAuth = () => ({
    type: RESET_AUTH,
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
