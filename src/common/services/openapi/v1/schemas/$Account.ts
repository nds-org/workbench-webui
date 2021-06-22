/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Account = {
    properties: {
        id: {
            type: 'string',
        },
        name: {
            type: 'string',
        },
        email: {
            type: 'string',
        },
        description: {
            type: 'string',
        },
        namespace: {
            type: 'string',
        },
        storageQuota: {
            type: 'string',
        },
        nexturl: {
            type: 'string',
        },
        resourceLimits: {
            properties: {
                cpuMax: {
                    type: 'string',
                },
                cpuDefault: {
                    type: 'string',
                },
                memMax: {
                    type: 'string',
                },
                memDefault: {
                    type: 'string',
                },
                storageQuota: {
                    type: 'string',
                },
            },
        },
        resourceUsage: {
            properties: {
                cpu: {
                    type: 'string',
                },
                memory: {
                    type: 'string',
                },
                storage: {
                    type: 'string',
                },
            },
        },
    },
};