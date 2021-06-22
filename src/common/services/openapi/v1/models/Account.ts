/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Account = {
    id?: string;
    name?: string;
    email?: string;
    description?: string;
    namespace?: string;
    storageQuota?: string;
    nexturl?: string;
    resourceLimits?: {
        cpuMax?: string,
        cpuDefault?: string,
        memMax?: string,
        memDefault?: string,
        storageQuota?: string,
    };
    resourceUsage?: {
        cpu?: string,
        memory?: string,
        storage?: string,
    };
}
