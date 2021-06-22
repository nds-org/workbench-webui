/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ServiceImage = {
    properties: {
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