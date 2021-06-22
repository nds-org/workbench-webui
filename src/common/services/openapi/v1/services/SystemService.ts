/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { request as __request } from '../core/request';

export class SystemService {

    /**
     * Retrieve the server version
     *
     * @returns string OK
     * @throws ApiError
     */
    public static async getVersion(): Promise<string> {
        const result = await __request({
            method: 'GET',
            path: `/version`,
        });
        return result.body;
    }

}