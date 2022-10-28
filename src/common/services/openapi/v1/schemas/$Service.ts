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
        catalog: {
            type: 'Enum',
            isRequired: true,
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
        info: {
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
            type: 'array',
            contains: {
                type: 'Config',
            },
            isRequired: true,
        },
        readinessProbe: {
            type: 'ReadyProbe',
        },
        image: {
            type: 'ServiceImage',
            isRequired: true,
        },
        resourceLimits: {
            type: 'ResourceLimits',
        },
        additionalResources: {
            type: 'array',
            contains: {
                type: 'string',
            },
            isRequired: true,
        },
        depends: {
            type: 'array',
            contains: {
                type: 'ServiceDependency',
            },
            isRequired: true,
        },
        ports: {
            type: 'array',
            contains: {
                type: 'Port',
            },
            isRequired: true,
        },
        volumeMounts: {
            type: 'array',
            contains: {
                type: 'VolumeMount',
            },
            isRequired: true,
        },
        repositories: {
            type: 'array',
            contains: {
                type: 'Repository',
            },
            isRequired: true,
        },
        command: {
            type: 'array',
            contains: {
                type: 'string',
            },
            isRequired: true,
        },
        args: {
            type: 'array',
            contains: {
                type: 'string',
            },
            isRequired: true,
        },
        tags: {
            type: 'array',
            contains: {
                type: 'string',
            },
            isRequired: true,
        },
        createdTime: {
            type: 'number',
        },
        updatedTime: {
            type: 'number',
        },
    },
};