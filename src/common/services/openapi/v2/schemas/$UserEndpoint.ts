/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $UserEndpoint = {
    properties: {
        internalIP: {
            type: 'string',
        },
        host: {
            type: 'string',
        },
        ports: {
            type: 'array',
            contains: {
                type: 'Port',
            },
        },
    },
};