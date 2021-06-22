/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $StackService = {
    properties: {
        id: {
            type: 'string',
        },
        stack: {
            type: 'string',
            isRequired: true,
        },
        service: {
            type: 'string',
            isRequired: true,
        },
        status: {
            type: 'string',
        },
        imageTag: {
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
                properties: {
                    internalIP: {
                        type: 'string',
                    },
                    host: {
                        type: 'string',
                    },
                    ports: {
                        type: 'array',
                        contains: {
                            properties: {
                            },
                        },
                    },
                },
            },
        },
    },
};