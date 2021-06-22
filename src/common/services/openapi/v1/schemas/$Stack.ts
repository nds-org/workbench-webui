/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Stack = {
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
        services: {
            type: 'array',
            contains: {
                type: 'StackService',
            },
        },
        status: {
            type: 'string',
        },
        action: {
            type: 'string',
        },
        createTime: {
            type: 'number',
        },
        updateTime: {
            type: 'number',
        },
    },
};