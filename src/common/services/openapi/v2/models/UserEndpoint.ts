/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Port } from './Port';

export type UserEndpoint = {
    internalIP?: string;
    host?: string;
    ports?: Array<Port>;
}
