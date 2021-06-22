/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Service = {
    properties: {
        id: {
            type: 'string',
        },
        key: {
            type: 'string',
            isRequired: true,
        },
        label: {
            type: 'string',
        },
        description: {
            type: 'string',
        },
        maintainer: {
            type: 'string',
        },
        logo: {
            type: 'string',
        },
        display: {
            type: 'string',
        },
        access: {
            type: 'string',
        },
        developerEnvironment: {
            type: 'string',
        },
        config: {
            type: 'Config',
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
        depends: {
            type: 'array',
            contains: {
                type: 'ServiceDependency',
            },
        },
        ports: {
            type: 'array',
            contains: {
                type: 'Port',
            },
        },
        volumeMounts: {
            type: 'array',
            contains: {
                type: 'VolumeMount',
            },
        },
        repositories: {
            type: 'array',
            contains: {
                type: 'Repository',
            },
        },
        command: {
            type: 'array',
            contains: {
                type: 'string',
            },
        },
        args: {
            type: 'array',
            contains: {
                type: 'string',
            },
        },
        tags: {
            type: 'array',
            contains: {
                type: 'string',
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