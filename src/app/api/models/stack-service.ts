/* tslint:disable */
export interface StackService {
  id?: string;
  stackId?: string;
  serviceId?: string;
  status?: string;
  imageTag?: string;
  statusMessage?: Array<string>;
  endpoints?: Array<{internalIP?: string, host?: string, ports?: Array<{}>}>;
}
