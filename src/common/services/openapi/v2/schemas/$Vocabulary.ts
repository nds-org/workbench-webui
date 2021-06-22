/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Vocabulary = {
    properties: {
        name: {
            type: 'string',
            isRequired: true,
        },
        terms: {
            type: 'array',
            contains: {
                type: 'VocabTerm',
            },
            isRequired: true,
        },
    },
};