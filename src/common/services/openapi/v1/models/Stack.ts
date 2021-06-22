/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { StackService } from './StackService';

export type Stack = {
    id?: string;
    key: string;
    name?: string;
    services?: Array<StackService>;
    status?: string;
    action?: string;
    createTime?: number;
    updateTime?: number;
}
