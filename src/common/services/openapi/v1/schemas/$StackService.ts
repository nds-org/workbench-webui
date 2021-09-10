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
        statusMessage: {
            type: 'array',
            contains: {
                type: 'string',
            },
        },
        developerEnvironment: {
            type: 'string',
        },
        config: {
            type: 'dictionary',
            contains: {
                type: 'string',
            },
            isRequired: true,
        },
        readinessProbe: {
            type: 'ReadyProbe',
        },
        image: {
            type: 'ServiceImage',
        },
        resourceLimits: {
            type: 'ResourceLimits',
        },
        volumeMounts: {
            type: 'dictionary',
            contains: {
                type: 'string',
            },
            isRequired: true,
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