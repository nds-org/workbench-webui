/* tslint:disable */
import { Config } from './config';
import { ReadyProbe } from './ready-probe';
import { ServiceImage } from './service-image';
import { ResourceLimits } from './resource-limits';
import { ServiceDependency } from './service-dependency';
import { Port } from './port';
import { VolumeMount } from './volume-mount';
import { Repository } from './repository';
export interface Service {
  id?: string;
  key?: string;
  label?: string;
  description?: string;
  maintainer?: string;
  logo?: string;
  display?: string;
  access?: string;
  developerEnvironment?: string;
  config?: Config;
  readinessProbe?: ReadyProbe;
  image?: ServiceImage;
  resourceLimits?: ResourceLimits;
  depends?: Array<ServiceDependency>;
  ports?: Array<Port>;
  volumeMounts?: Array<VolumeMount>;
  repositories?: Array<Repository>;
  command?: Array<string>;
  args?: Array<string>;
  tags?: Array<string>;
  createdTime?: number;
  updatedTime?: number;
}
