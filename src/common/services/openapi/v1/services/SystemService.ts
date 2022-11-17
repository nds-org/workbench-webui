/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { request as __request } from '../core/request';

export class SystemService {

    /**
     * Retrieve the server version from the Swagger spec
     *
     * @returns any OK
     * @throws ApiError
     */
    public static async getVersion(): Promise<{
        version?: string,
        hash?: string,
    }> {
        const result = await __request({
            method: 'GET',
            path: `/version`,
            errors: {
                404: `Not found`,
            },
        });
        return result.body;
    }

}