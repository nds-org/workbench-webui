/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Vocabulary = {
    properties: {
        name: {
            type: 'string',
        },
        terms: {
            type: 'array',
            contains: {
                properties: {
                    id: {
                        type: 'string',
                    },
                    name: {
                        type: 'string',
                    },
                    definition: {
                        type: 'string',
                    },
                },
            },
        },
    },
};