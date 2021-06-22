/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $UserAccount = {
    properties: {
        name: {
            type: 'string',
            isRequired: true,
        },
        email: {
            type: 'string',
            isRequired: true,
        },
        namespace: {
            type: 'string',
            isRequired: true,
        },
        description: {
            type: 'string',
            isRequired: true,
        },
        nexturl: {
            type: 'string',
            isRequired: true,
        },
        resourceLimits: {
            type: 'ResourceLimits',
        },
        resourceUsage: {
            properties: {
                cpu: {
                    type: 'string',
                    isRequired: true,
                },
                memory: {
                    type: 'string',
                    isRequired: true,
                },
                storage: {
                    type: 'string',
                    isRequired: true,
                },
            },
        },
        createdTime: {
            type: 'number',
        },
        updatedTime: {
            type: 'number',
        },
    },
};