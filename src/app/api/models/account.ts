/* tslint:disable */
export interface Account {
  id?: string;
  name?: string;
  description?: string;
  namespace?: string;
  storageQuota?: string;
  nexturl?: string;
  resourceLimits?: {cpuMax?: string, cpuDefault?: string, memMax?: string, memDefault?: string, storageQuota?: string};
  resourceUsage?: {cpu?: string, memory?: string, storage?: string};
}
