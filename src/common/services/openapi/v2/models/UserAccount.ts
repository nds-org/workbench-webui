/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ResourceLimits } from './ResourceLimits';

export type UserAccount = {
    name: string;
    email: string;
    namespace: string;
    description: string;
    nexturl: string;
    resourceLimits?: ResourceLimits;
    resourceUsage?: {
        cpu: string,
        memory: string,
        storage: string,
    };
    createdTime?: number;
    updatedTime?: number;
}
