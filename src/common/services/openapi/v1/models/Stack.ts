/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { StackService } from './StackService';

export type Stack = {
    id?: string;
    key: string;
    secure?: boolean;
    name?: string;
    services?: Array<StackService>;
    status?: string;
    action?: string;
    createdTime?: number;
    updateTime?: number;
}
