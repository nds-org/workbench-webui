/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ServiceImage = {
    properties: {
        registry: {
            type: 'string',
        },
        name: {
            type: 'string',
        },
        tags: {
            type: 'array',
            contains: {
                type: 'string',
            },
        },
    },
};