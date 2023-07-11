/**
 * Helpers and utility functions for working with UserApps.
 */


import { V1 } from ".";

export const deepCopy = (obj: any) => {
    return JSON.parse(JSON.stringify(obj));
}

export const newSpec = (): V1.Service => ({
    // Basic Info
    key: '',
    label: '',

    // Access Info
    display: 'stack',
    access: 'external',

    // Docker info
    image: {
        name: '',
        tags: ['latest']
    },

    // Help Info
    logo: '/ndslabs-badge.png',
    info: '',

    // Tabbed info
    depends: [],
    config: [],
    ports: [],
    volumeMounts: [],

    // TODO: no UI for these yet (advanced features)
    additionalResources: [],
    developerEnvironment: undefined,
    repositories: [],
    command: [],
    args: [],
    catalog: 'user',
    tags: []
});

export const copySpec = (spec: V1.Service): V1.Service => {
    const specCopy = {...spec};

    // AppSpec metadata
    specCopy.id = '';
    specCopy.key = specCopy.key + 'copy';
    specCopy.label = 'Copy of ' + (specCopy.label || specCopy.key);
    specCopy.catalog = 'user';

    // Docker Image / tags / resource limits
    specCopy.image.name = specCopy.image.name || '';
    specCopy.image.tags = specCopy.image.tags || ['latest'];
    specCopy.resourceLimits = undefined;

    // Command / arg
    specCopy.command = specCopy.command || [];
    specCopy.args = specCopy.args || [];

    // Array properties
    specCopy.repositories = specCopy.repositories || [];
    specCopy.ports = specCopy.ports || [];
    specCopy.config = specCopy.config || [];
    specCopy.volumeMounts = specCopy.volumeMounts || [];
    specCopy.additionalResources = specCopy.additionalResources || [];

    return specCopy;
}

export const newStack = (appSpec: V1.Service, allSpecs: Array<V1.Service>): V1.Stack => {
    const key = appSpec.key;

    const stack: V1.Stack = {
        id: "",
        name: deepCopy(appSpec.label),
        key: key,
        // secure: this.copy(appSpec.authRequired),
        status: "stopped",
        services: []
    }

    const services = stack.services || [];

    // Add base service
    services.push(newStackService(appSpec, stack));

    const deps = appSpec.depends || [];

    // Add required service dependencies
    deps.filter((dep: V1.ServiceDependency) => dep.required)
        .forEach((reqDep: V1.ServiceDependency) => {
            const depKey = reqDep.key;
            if (!depKey) {
                console.error(`Empty key encountered: ${appSpec.key}-${depKey}   <--- this shouldn't be empty`);
            } else {
                const depSpec = allSpecs.find(spec => spec.key === reqDep.key);
                if (depSpec) {
                    services.push(newStackService(depSpec, stack));
                } else {
                    console.error("Spec not found: " + reqDep.key);
                }
            }
        });

    stack.services = services;

    return stack;
}

export const newStackService = (appSpec: V1.Service, stack: V1.Stack): V1.StackService => {
    const service: V1.StackService = {
        id: "",
        stack: stack.key,
        service: appSpec.key,
        status: "",

        // Copy default values from spec
        // ports: copy(appSpec.ports),


        // Different format means we need to build this up manually
        volumeMounts: {},
        config: {},
    }

    if (appSpec?.resourceLimits?.cpuMax) {
        service.resourceLimits = {
            cpuMax: appSpec.resourceLimits.cpuMax + "",
            cpuDefault: appSpec.resourceLimits.cpuDefault + "",
            memMax: appSpec.resourceLimits.memMax + "",
            memDefault: appSpec.resourceLimits.memDefault + ""
        };
    }

    return service;
}

// Creates a new Stack (UserApp) from the given Service (AppSpec)

//export default { copy, newStack, newStackService };
