/* istanbul ignore file */
/* tslint:disable */

import { V1 } from './services';
import Cookies from "universal-cookie";

/* eslint-disable */
export * from './services';
export * from './card';
export * from './layout';

const cookies = new Cookies();

const handleError = (message: string, reason: Error) => {
    console.error(`${message}: `, reason);

    if (reason.message.includes('Unauthorized')) {
        // Clear any stale auth info
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        //cookies.remove('user');

        if (!window.location.href.includes('login')) {
            console.error("Redirecting to login view...");
            window.location.href = '/login?rd='+encodeURIComponent(window.location.pathname);
        }
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

export { handleError, waitFor };
