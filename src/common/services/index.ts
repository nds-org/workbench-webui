/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import * as V1 from './openapi/v1';
import * as V2 from './openapi/v2';

import { deepCopy, newSpec, newStack, newStackService, copySpec } from './userapps.service';

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


export const UNAUTHORIZED_401 = (reason: Error) => {return reason.message.includes('Unauthorized');}
export const CONFLICT_409 = (reason: Error) => {return reason.message.includes('Conflict');}

const handleError = (message: string, reason: Error, onUnath?: () => void) => {
    console.error(`${message}: `, reason);
    console.error("Should redirect to login view...");
    const isAuthErr = UNAUTHORIZED_401(reason);

    if (isAuthErr) {
        // Clear any stale auth info
        localStorage.removeItem('auth');

        if (onUnath) {
            onUnath();
        }

        // Hard redirect to login (include return route)
        console.error("Redirecting to login view...");
        if (window.location.pathname !== '/' && !window.location.pathname.includes('login')) {
            window.location.href = '/login?rd=' + encodeURIComponent(window.location.pathname);
        }
    } else {
        console.log('Full reason: ', reason);
    }

}

const waitFor = (condition: () => Promise<boolean>, period: number = 2000) => {
    let interval = setInterval(async () => {
        // Check if condition is true
        condition().then(bool => {
            bool && clearInterval(interval);
        }).catch(reason => clearInterval(interval));
    }, period);
}

export { copySpec, deepCopy, handleError, newSpec, newStack, newStackService, V1, V2, waitFor };
