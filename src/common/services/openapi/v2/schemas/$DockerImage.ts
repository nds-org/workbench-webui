/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $DockerImage = {
    properties: {
        repo: {
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