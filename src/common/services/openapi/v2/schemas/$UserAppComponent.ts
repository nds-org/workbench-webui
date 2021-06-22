/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $UserAppComponent = {
    properties: {
        specKey: {
            type: 'string',
            isRequired: true,
        },
        id: {
            type: 'string',
        },
        app: {
            type: 'string',
        },
        image: {
            type: 'DockerImage',
        },
        status: {
            type: 'string',
        },
        statusMessage: {
            type: 'array',
            contains: {
                type: 'string',
            },
        },
        endpoints: {
            type: 'array',
            contains: {
                type: 'UserEndpoint',
            },
            isRequired: true,
        },
    },
};