/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppSpec } from '../models/AppSpec';
import { request as __request } from '../core/request';

export class AppSpecService {

    /**
     * Retrieve a list of system-level Application Specs
     * Retrieve a list of Application Specs from the catalog that are offered to all users by the system
     *
     * @returns AppSpec OK
     * @throws ApiError
     */
    public static async listSystemSpecs(): Promise<Array<AppSpec>> {
        const result = await __request({
            method: 'GET',
            path: `/specs`,
        });
        return result.body;
    }

    /**
     * Add a new system-level Application Spec
     * Add a new system-level Application Spec
     *
     * @param requestBody
     * @returns AppSpec Created
     * @throws ApiError
     */
    public static async createSystemSpec(
        requestBody?: AppSpec,
    ): Promise<AppSpec> {
        const result = await __request({
            method: 'POST',
            path: `/specs`,
            body: requestBody,
            errors: {
                401: `Not authorized`,
                403: `Forbidden`,
            },
        });
        return result.body;
    }

    /**
     * Retrieve a single system-level Application Spec
     * Retrieve a list of Application Specs from the catalog that are offered to all users by the system
     *
     * @param specId The unique application spec identifier
     * @returns AppSpec OK
     * @throws ApiError
     */
    public static async getSystemSpecById(
        specId: string,
    ): Promise<AppSpec> {
        const result = await __request({
            method: 'GET',
            path: `/specs/${specId}`,
            errors: {
                404: `Not found`,
            },
        });
        return result.body;
    }

    /**
     * Update a user-level Application Spec
     * Update a user-level Application Spec
     *
     * @param specId The unique application spec identifier
     * @param requestBody
     * @returns AppSpec OK
     * @throws ApiError
     */
    public static async updateSystemSpec(
        specId: string,
        requestBody?: AppSpec,
    ): Promise<AppSpec> {
        const result = await __request({
            method: 'PUT',
            path: `/specs/${specId}`,
            body: requestBody,
            errors: {
                304: `Not modified`,
                401: `Not authorized`,
                403: `Forbidden`,
                404: `Not found`,
                409: `Conflict`,
            },
        });
        return result.body;
    }

    /**
     * Delete a user-level Application Spec
     * Delete a user-level Application Spec
     *
     * @param specId The unique application spec identifier
     * @returns AppSpec OK
     * @throws ApiError
     */
    public static async deleteSystemSpec(
        specId: string,
    ): Promise<AppSpec> {
        const result = await __request({
            method: 'DELETE',
            path: `/specs/${specId}`,
            errors: {
                401: `Not authorized`,
                403: `Forbidden`,
                404: `Not found`,
            },
        });
        return result.body;
    }

    /**
     * Retrieve a list of user-level Application Specs
     * Retrieve a list of Application Specs from the catalog that a user has added
     *
     * @param username The unique account identifier
     * @returns AppSpec OK
     * @throws ApiError
     */
    public static async listUserSpecs(
        username: string,
    ): Promise<Array<AppSpec>> {
        const result = await __request({
            method: 'GET',
            path: `/users/${username}/specs`,
            errors: {
                401: `Not authorized`,
                403: `Forbidden`,
                404: `Not found`,
            },
        });
        return result.body;
    }

    /**
     * Add a new user-level Application Spec
     * Add a new user-level Application Spec
     *
     * @param username The unique account identifier
     * @param requestBody
     * @returns AppSpec Created
     * @throws ApiError
     */
    public static async createUserSpec(
        username: string,
        requestBody?: AppSpec,
    ): Promise<AppSpec> {
        const result = await __request({
            method: 'POST',
            path: `/users/${username}/specs`,
            body: requestBody,
            errors: {
                401: `Not authorized`,
                403: `Forbidden`,
            },
        });
        return result.body;
    }

    /**
     * Retrieve a single user-level Application Spec
     * Retrieve a single Application Spec created by a user
     *
     * @param username The unique account identifier
     * @param specId The unique application spec identifier
     * @returns AppSpec OK
     * @throws ApiError
     */
    public static async getUserSpecById(
        username: string,
        specId: string,
    ): Promise<AppSpec> {
        const result = await __request({
            method: 'GET',
            path: `/users/${username}/specs/${specId}`,
            errors: {
                401: `Not authorized`,
                403: `Forbidden`,
                404: `Not found`,
            },
        });
        return result.body;
    }

    /**
     * Update a user-level Application Spec
     * Update a user-level Application Spec
     *
     * @param username The unique account identifier
     * @param specId The unique application spec identifier
     * @param requestBody
     * @returns AppSpec OK
     * @throws ApiError
     */
    public static async updateUserSpec(
        username: string,
        specId: string,
        requestBody?: AppSpec,
    ): Promise<AppSpec> {
        const result = await __request({
            method: 'PUT',
            path: `/users/${username}/specs/${specId}`,
            body: requestBody,
            errors: {
                304: `Not modified`,
                401: `Not authorized`,
                403: `Forbidden`,
                404: `Not found`,
                409: `Conflict`,
            },
        });
        return result.body;
    }

    /**
     * Delete a user-level Application Spec
     * Delete a user-level Application Spec
     *
     * @param username The unique account identifier
     * @param specId The unique application spec identifier
     * @returns AppSpec OK
     * @throws ApiError
     */
    public static async deleteUserSpec(
        username: string,
        specId: string,
    ): Promise<AppSpec> {
        const result = await __request({
            method: 'DELETE',
            path: `/users/${username}/specs/${specId}`,
            errors: {
                401: `Not authorized`,
                403: `Forbidden`,
                404: `Not found`,
            },
        });
        return result.body;
    }

}