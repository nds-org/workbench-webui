/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Port } from './Port';

export type ReadyProbe = {
    port: Port;
    initialDelay: number;
    timeout: number;
}
