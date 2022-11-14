/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Service } from '../models/Service';
import { request as __request } from '../core/request';

export class AppSpecService {

    /**
     * Retrieves a site-wide list of all available service definitions,
     * including those added by the user.
     *
     * @returns Service OK
     * @throws ApiError
     */
    public static async listServicesAll(): Promise<Array<Service>> {
        const result = await __request({
            method: 'GET',
            path: `/services/all`,
            errors: {
                401: `Unauthorized - missing or invalid login token`,
            },
        });
        return result.body;
    }

    /**
     * Retrieves a list of available service definitions that have been
     * added by the current user.
     *
     * @returns Service OK
     * @throws ApiError
     */
    public static async listServicesForUser(): Promise<Array<Service>> {
        const result = await __request({
            method: 'GET',
            path: `/services/mine`,
            errors: {
                401: `Unauthorized - missing or invalid login token`,
            },
        });
        return result.body;
    }

    /**
     * Retrieves a site-wide list of available service definitions.
     *
     * @returns Service OK
     * @throws ApiError
     */
    public static async listServices(): Promise<Array<Service>> {
        const result = await __request({
            method: 'GET',
            path: `/services`,
            errors: {
                401: `Unauthorized - missing or invalid login token`,
            },
        });
        return result.body;
    }

    /**
     * Adds a new service to the service library
     *
     * @param service Service definition
     * @returns Service Created
     * @throws ApiError
     */
    public static async createService(
        service: Service,
    ): Promise<Service> {
        const result = await __request({
            method: 'POST',
            path: `/services`,
            body: service,
            errors: {
                400: `Validation failed - spec is invalid`,
                401: `Unauthorized - missing or invalid login token`,
                403: `Forbidden - missing required scope`,
                409: `Conflict - spec key already exists`,
            },
        });
        return result.body;
    }

    /**
     * Retrieves the service definition.
     *
     * @param serviceId The unique service identifier
     * @returns Service OK
     * @throws ApiError
     */
    public static async getServiceById(
        serviceId: string,
    ): Promise<Service> {
        const result = await __request({
            method: 'GET',
            path: `/services/${serviceId}`,
            errors: {
                404: `Not found - spec key not found`,
            },
        });
        return result.body;
    }

    /**
     * Updates a service definition in the app catalog
     *
     * @param serviceId The unique service identifier
     * @param service Service definition
     * @returns Service Update saved successfully
     * @throws ApiError
     */
    public static async updateService(
        serviceId: string,
        service: Service,
    ): Promise<Service> {
        const result = await __request({
            method: 'PUT',
            path: `/services/${serviceId}`,
            body: service,
            errors: {
                304: `Not modified - spec has not changed`,
                400: `Validation failed - spec is invalid`,
                403: `Authorization failed - user is forbidden`,
                409: `Conflict - spec key already exists`,
            },
        });
        return result.body;
    }

    /**
     * Delete a service
     *
     * @param serviceId The unique service identifier
     * @returns void
     * @throws ApiError
     */
    public static async deleteService(
        serviceId: string,
    ): Promise<void> {
        const result = await __request({
            method: 'DELETE',
            path: `/services/${serviceId}`,
            errors: {
                403: `Authorization failed - user is forbidden`,
            },
        });
        return result.body;
    }

}