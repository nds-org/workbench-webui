/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DockerImage } from './DockerImage';
import type { UserEndpoint } from './UserEndpoint';

export type UserAppComponent = {
    specKey: string;
    id?: string;
    app?: string;
    image?: DockerImage;
    status?: string;
    statusMessage?: Array<string>;
    endpoints: Array<UserEndpoint>;
}
