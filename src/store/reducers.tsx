import * as actions from "./actions";
import { combineReducers } from "redux";
//import {V1} from "../common";
import {AuthPayload, EnvPayload, /*StackPayload*/} from "./actions";

interface Action<T> {
    type: string;
    payload: T;
}


const preferences = (state = { darkThemeEnabled: false }, action: Action<any>) => {
    switch (action.type) {
        case actions.TOGGLE_DARKTHEME:
            return { ...state, darkThemeEnabled: !state.darkThemeEnabled };

        default:
            return state;
    }
};

const auth = (state = { token: '', username: '' }, action: Action<AuthPayload>) => {
    switch (action.type) {
        case actions.SET_AUTH:
            return { ...state, token: action.payload.token, username: action.payload.username };

        case actions.RESET_AUTH:
            return { ...state, token: '', username: ''};


        default:
            return state;
    }
};

const env = (state: any = { }, action: Action<EnvPayload>) => {
    switch (action.type) {
        case actions.SET_ENV:
            return { ...state, ...action.payload.env };
        default:
            return state;
    }
}

/** TODO: Does this make any sense? */
/*const serverData = (state = { stacks: [], specs: [] }, action: Action<StackPayload>) => {
    const stack: V1.Stack = action.payload.stack;
    const stacks: Array<V1.Stack> = state.stacks;
    const existing: V1.Stack | undefined = stacks.find(s => s.id === stack.id);

    switch (action.type) {
        case actions.STACK_CREATE:
            stacks.push(stack);
            return { ...state, stacks: state.stacks };

        case actions.STACK_RETRIEVE:
            // TODO: How to fetch/populate server data
            return { ...state, stacks: state.stacks };

        case actions.STACK_UPDATE:
            if (existing) {
                const index = stacks.indexOf(existing);
                stacks.splice(index, 1, stack);
            }
            return { ...state, stacks: state.stacks };

        case actions.STACK_DELETE:
            if (existing) {
                const index = stacks.indexOf(existing);
                stacks.splice(index, 1);
            }
            return { ...state, stacks: state.stacks };


        default:
            return state;
    }
};*/

export default combineReducers({ preferences, auth, env, /*serverData*/ });
