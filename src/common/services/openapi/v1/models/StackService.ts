/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ReadyProbe } from './ReadyProbe';
import type { ResourceLimits } from './ResourceLimits';

export type StackService = {
    id?: string;
    stack: string;
    createdTime?: number;
    updateTime?: number;
    service: string;
    status?: string;
    statusMessages?: Array<string>;
    developerEnvironment?: string;
    config: Record<string, string>;
    internalIP?: string;
    singlePod?: boolean;
    collocate?: boolean;
    readinessProbe?: ReadyProbe;
    imageTag?: string;
    resourceLimits?: ResourceLimits;
    volumeMounts: Record<string, string>;
    endpoints?: Array<{
        host?: string,
        path?: string,
        url?: string,
        port?: number,
        nodePort?: number,
        protocol?: string,
    }>;
}
