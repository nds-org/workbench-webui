/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Config } from './Config';
import type { Port } from './Port';
import type { ReadyProbe } from './ReadyProbe';
import type { Repository } from './Repository';
import type { ResourceLimits } from './ResourceLimits';
import type { ServiceDependency } from './ServiceDependency';
import type { ServiceImage } from './ServiceImage';
import type { VolumeMount } from './VolumeMount';

export type Service = {
    id?: string;
    key: string;
    label?: string;
    catalog: 'system' | 'user' | 'all';
    description?: string;
    maintainer?: string;
    securityContext?: {
        privileged?: boolean,
        allowPrivilegeEscalation?: boolean,
        runAsUser?: number,
        runAsGroup?: number,
        procMount?: string,
        readOnlyRootFilesystem?: boolean,
        runAsNonRoot?: boolean,
        capabilities?: {
            add?: Array<string>,
        },
    };
    logo?: string;
    info?: string;
    display?: string;
    access?: string;
    developerEnvironment?: string;
    config: Array<Config>;
    readinessProbe?: ReadyProbe;
    image: ServiceImage;
    resourceLimits?: ResourceLimits;
    additionalResources: Array<string>;
    depends: Array<ServiceDependency>;
    ports: Array<Port>;
    volumeMounts: Array<VolumeMount>;
    repositories: Array<Repository>;
    command: Array<string>;
    args: Array<string>;
    tags: Array<string>;
    createdTime?: number;
    updatedTime?: number;
}
