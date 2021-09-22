/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import * as V1 from './openapi/v1';
import * as V2 from './openapi/v2';
import Cookies from "universal-cookie";

const cookies = new Cookies();

V1.OpenAPI.BASE = V2.OpenAPI.BASE = 'http://localhost:30001/api';

/*const token = cookies.get('token');
if (token) {
    V1.OpenAPI.TOKEN = V2.OpenAPI.TOKEN = token;
    V1.UserAccountService.checkToken().then(resp => {
        //onLogin(username, token);
        console.log("Token is valid! Using token.");
    }).catch(reason => {
        console.error('Token is invalid! Removing token ', reason);
        cookies.remove('token');
        cookies.remove('username');
        cookies.remove('user');
    });
}*/

// Sanity check
/*setInterval(() => {
    V1.OpenAPI.TOKEN = V2.OpenAPI.TOKEN = cookies.get('token');
}, 10000);*/


export { V1, V2 };
