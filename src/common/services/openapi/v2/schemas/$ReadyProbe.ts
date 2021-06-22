/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ReadyProbe = {
    properties: {
        port: {
            type: 'Port',
            isRequired: true,
        },
        initialDelay: {
            type: 'number',
            isRequired: true,
            maximum: 86400,
        },
        timeout: {
            type: 'number',
            isRequired: true,
            maximum: 86400,
        },
    },
};