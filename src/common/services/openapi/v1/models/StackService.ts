/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ReadyProbe } from './ReadyProbe';
import type { ResourceLimits } from './ResourceLimits';
import type { ServiceImage } from './ServiceImage';

export type StackService = {
    id?: string;
    stack: string;
    service: string;
    status?: string;
    statusMessage?: Array<string>;
    developerEnvironment?: string;
    config: Record<string, string>;
    readinessProbe?: ReadyProbe;
    image?: ServiceImage;
    resourceLimits?: ResourceLimits;
    volumeMounts: Record<string, string>;
    endpoints?: Array<{
        internalIP?: string,
        host?: string,
        ports?: Array<any>,
    }>;
}
