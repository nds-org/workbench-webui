export const TOGGLE_DARKTHEME = "TOGGLE_DARKTHEME";
export const SET_AUTH = "SET_AUTH";
export const RESET_AUTH = "RESET_AUTH";

export const toggleDarkTheme = () => ({
    type: TOGGLE_DARKTHEME,
});

export const setAuth = (payload: { token: string; username: string; }) => ({
    type: SET_AUTH,
    payload
});

export const resetAuth = () => ({
    type: RESET_AUTH,
});

