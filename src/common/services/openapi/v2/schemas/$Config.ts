/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Config = {
    properties: {
        name: {
            type: 'string',
            isRequired: true,
        },
        value: {
            type: 'string',
            isRequired: true,
        },
        label: {
            type: 'string',
            isRequired: true,
        },
        canOverride: {
            type: 'boolean',
            isRequired: true,
        },
        isPassword: {
            type: 'boolean',
            isRequired: true,
        },
    },
};