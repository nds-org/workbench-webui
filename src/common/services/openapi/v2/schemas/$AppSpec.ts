/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $AppSpec = {
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
            isRequired: true,
        },
        description: {
            type: 'string',
            isRequired: true,
        },
        maintainer: {
            type: 'string',
            isRequired: true,
        },
        logo: {
            type: 'string',
            isRequired: true,
        },
        display: {
            type: 'Enum',
            isRequired: true,
        },
        access: {
            type: 'Enum',
            isRequired: true,
        },
        developerEnvironment: {
            type: 'string',
            isRequired: true,
        },
        config: {
            type: 'Config',
        },
        readinessProbe: {
            type: 'ReadyProbe',
        },
        image: {
            type: 'DockerImage',
        },
        resourceLimits: {
            type: 'ResourceLimits',
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