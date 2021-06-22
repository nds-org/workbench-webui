/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserAppComponent } from './UserAppComponent';

export type UserApp = {
    id?: string;
    key: string;
    name?: string;
    components: Array<UserAppComponent>;
    status?: string;
    createdTime?: number;
    updatedTime?: number;
}
