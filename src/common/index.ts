/* istanbul ignore file */
/* tslint:disable */

import { V1 } from './services';

/* eslint-disable */
export * from './services';
export * from './card';
export * from './layout';

const handleError = (message: string, reason: Error) => {
    console.error(`${message}: `, reason);
    if (reason.message.includes('Unauthorized')) {
        if (!window.location.href.includes('login')) {
            window.location.href = '/login';
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
