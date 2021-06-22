/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type StackService = {
    id?: string;
    stack: string;
    service: string;
    status?: string;
    imageTag?: string;
    statusMessage?: Array<string>;
    endpoints?: Array<{
        internalIP?: string,
        host?: string,
        ports?: Array<any>,
    }>;
}
