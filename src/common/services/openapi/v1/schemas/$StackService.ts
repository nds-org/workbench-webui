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
        createdTime: {
            type: 'number',
        },
        updateTime: {
            type: 'number',
        },
        service: {
            type: 'string',
            isRequired: true,
        },
        status: {
            type: 'string',
        },
        statusMessages: {
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
        internalIP: {
            type: 'string',
        },
        readinessProbe: {
            type: 'ReadyProbe',
        },
        imageTag: {
            type: 'string',
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
        ports: {
            type: 'dictionary',
            contains: {
                type: 'number',
            },
            isRequired: true,
        },
        endpoints: {
            type: 'array',
            contains: {
                properties: {
                    host: {
                        type: 'string',
                    },
                    path: {
                        type: 'string',
                    },
                    url: {
                        type: 'string',
                    },
                    port: {
                        type: 'number',
                    },
                    nodePort: {
                        type: 'number',
                    },
                    protocol: {
                        type: 'string',
                    },
                },
            },
        },
    },
};