/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Config } from './Config';
import type { DockerImage } from './DockerImage';
import type { Port } from './Port';
import type { ReadyProbe } from './ReadyProbe';
import type { Repository } from './Repository';
import type { ResourceLimits } from './ResourceLimits';
import type { ServiceDependency } from './ServiceDependency';
import type { VolumeMount } from './VolumeMount';

export type AppSpec = {
    id?: string;
    key: string;
    label: string;
    description: string;
    maintainer: string;
    logo: string;
    display: 'none' | 'app';
    access: 'none' | 'internal' | 'external';
    developerEnvironment: string;
    config?: Config;
    readinessProbe?: ReadyProbe;
    image?: DockerImage;
    resourceLimits?: ResourceLimits;
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
