/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Port = {
    properties: {
        protocol: {
            type: 'Enum',
            isRequired: true,
        },
        number: {
            type: 'number',
            isRequired: true,
            maximum: 65535,
            minimum: 1,
        },
        path: {
            type: 'string',
            isRequired: true,
        },
        nodePort: {
            type: 'number',
            maximum: 65535,
            minimum: 32768,
        },
    },
};