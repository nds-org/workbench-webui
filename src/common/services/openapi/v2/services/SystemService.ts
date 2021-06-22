/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { request as __request } from '../core/request';

export class SystemService {

    /**
     * Get the current server version info
     * Retrieve information about the server's current version
     *
     * @returns any OK
     * @throws ApiError
     */
    public static async getVersion(): Promise<{
        server?: string,
    }> {
        const result = await __request({
            method: 'GET',
            path: `/version`,
        });
        return result.body;
    }

}