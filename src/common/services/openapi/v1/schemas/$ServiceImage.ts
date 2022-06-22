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
            isRequired: true,
        },
        tags: {
            type: 'array',
            contains: {
                type: 'string',
            },
            isRequired: true,
        },
    },
};