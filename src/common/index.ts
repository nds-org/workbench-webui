/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export * from './services';
export * from './card';
export * from './layout';

const AUTH_ERR = (reason: any) => reason.message.includes('Unauthorized');

const handleError = (message: string, reason: Error, onUnath?: () => void) => {
    console.error(`${message}: `, reason);

    if (AUTH_ERR(reason)) {
        // Clear any stale auth info
        localStorage.removeItem('auth');

        if (onUnath) {
            onUnath();
        }

        // Hard redirect to login (include return route)
        console.error("Redirecting to login view...");
        if (!window.location.href.includes('login')) {
            window.location.href = '/login?rd=' + encodeURIComponent(window.location.pathname);
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
