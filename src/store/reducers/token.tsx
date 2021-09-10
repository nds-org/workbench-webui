import { V1, V2 } from "../../common";

const token = (state: any = {}, action: any) => {
    switch (action.type) {
        case 'LOGIN':
            return V1.OpenAPI.TOKEN = V2.OpenAPI.TOKEN = state.token = action.token;
        case 'LOGOUT':
            return V1.OpenAPI.TOKEN = V2.OpenAPI.TOKEN = state.token = undefined;
        default:
            return state
    }
}

export default token;
