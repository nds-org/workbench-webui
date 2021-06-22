/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SupportRequest } from '../models/SupportRequest';
import { request as __request } from '../core/request';

export class SupportService {

    /**
     * Submit a support request
     *
     * @param support Support request definition
     * @returns any Created
     * @throws ApiError
     */
    public static async submitHelpRequest(
        support: SupportRequest,
    ): Promise<any> {
        const result = await __request({
            method: 'POST',
            path: `/support`,
            body: support,
        });
        return result.body;
    }

    /**
     * Get contact information
     *
     * @returns any OK
     * @throws ApiError
     */
    public static async getContactInfo(): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/contact`,
        });
        return result.body;
    }

}