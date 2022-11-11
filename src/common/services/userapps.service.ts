import {V1} from "./index";

export const copy = (obj: any) => {
    return JSON.parse(JSON.stringify(obj));
}

export const newStack = (appSpec: V1.Service, allSpecs: Array<V1.Service>): V1.Stack => {
    const key = appSpec.key;

    const stack: V1.Stack = {
        id: "",
        name: copy(appSpec.label),
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
    deps.filter(dep => dep.required).forEach((reqDep: V1.ServiceDependency) => {
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
