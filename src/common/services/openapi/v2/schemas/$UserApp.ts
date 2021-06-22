/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $UserApp = {
    properties: {
        id: {
            type: 'string',
        },
        key: {
            type: 'string',
            isRequired: true,
        },
        name: {
            type: 'string',
        },
        components: {
            type: 'array',
            contains: {
                type: 'UserAppComponent',
            },
            isRequired: true,
        },
        status: {
            type: 'string',
        },
        createdTime: {
            type: 'number',
        },
        updatedTime: {
            type: 'number',
        },
    },
};