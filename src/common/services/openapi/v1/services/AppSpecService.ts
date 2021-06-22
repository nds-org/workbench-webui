/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Service } from '../models/Service';
import { request as __request } from '../core/request';

export class AppSpecService {

    /**
     * Retrieves a site-wide list of available service definitions.
     *
     * @param catalog Filter list for catalog (user, system, all)
     * @returns Service OK
     * @throws ApiError
     */
    public static async listServices(
        catalog?: string,
    ): Promise<Array<Service>> {
        const result = await __request({
            method: 'GET',
            path: `/services`,
            query: {
                'catalog': catalog,
            },
        });
        return result.body;
    }

    /**
     * Adds a new service to the service library
     *
     * @param service Service definition
     * @returns any Created
     * @throws ApiError
     */
    public static async createService(
        service: Service,
    ): Promise<any> {
        const result = await __request({
            method: 'POST',
            path: `/services`,
            body: service,
        });
        return result.body;
    }

    /**
     * Retrieves the service definition.
     *
     * @param serviceId The unique service identifier
     * @returns Service The service object
     * @throws ApiError
     */
    public static async getServiceById(
        serviceId: string,
    ): Promise<Service> {
        const result = await __request({
            method: 'GET',
            path: `/services/${serviceId}`,
        });
        return result.body;
    }

    /**
     * Updates a service definition in the service library
     *
     * @param serviceId The unique service identifier
     * @param service Service definition
     * @returns any Updated
     * @throws ApiError
     */
    public static async updateService(
        serviceId: string,
        service: Service,
    ): Promise<any> {
        const result = await __request({
            method: 'PUT',
            path: `/services/${serviceId}`,
            body: service,
        });
        return result.body;
    }

    /**
     * Delete a service
     *
     * @param serviceId The unique service identifier
     * @returns any OK
     * @throws ApiError
     */
    public static async deleteService(
        serviceId: string,
    ): Promise<any> {
        const result = await __request({
            method: 'DELETE',
            path: `/services/${serviceId}`,
        });
        return result.body;
    }

}