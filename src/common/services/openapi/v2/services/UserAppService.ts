/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserApp } from '../models/UserApp';
import type { UserAppComponent } from '../models/UserAppComponent';
import type { UserAppComponentLogs } from '../models/UserAppComponentLogs';
import { request as __request } from '../core/request';

export class UserAppService {

    /**
     * Retrieve a list of User Application instances
     * Retrieve a list of Applications created by a user
     *
     * @param username The unique account identifier
     * @returns UserApp OK
     * @throws ApiError
     */
    public static async listUserApps(
        username: string,
    ): Promise<Array<UserApp>> {
        const result = await __request({
            method: 'GET',
            path: `/users/${username}/apps`,
        });
        return result.body;
    }

    /**
     * Create a new User Application instance
     * Create a new User Application instance
     *
     * @param username The unique account identifier
     * @param requestBody
     * @returns UserApp Created
     * @throws ApiError
     */
    public static async createUserApp(
        username: string,
        requestBody?: UserApp,
    ): Promise<UserApp> {
        const result = await __request({
            method: 'POST',
            path: `/users/${username}/apps`,
            body: requestBody,
            errors: {
                401: `Not authorized`,
                403: `Forbidden`,
            },
        });
        return result.body;
    }

    /**
     * Retrieve a single User Application instance created by a user
     * Retrieve a single User Application created by a user
     *
     * @param username The unique account identifier
     * @param userAppId The unique user application identifier
     * @returns UserApp OK
     * @throws ApiError
     */
    public static async getUserAppById(
        username: string,
        userAppId: string,
    ): Promise<UserApp> {
        const result = await __request({
            method: 'GET',
            path: `/users/${username}/apps/${userAppId}`,
        });
        return result.body;
    }

    /**
     * Update a User Application
     * Update a User Application
     *
     * @param username The unique account identifier
     * @param userAppId The unique user application identifier
     * @param requestBody
     * @returns UserApp OK
     * @throws ApiError
     */
    public static async updateUserApp(
        username: string,
        userAppId: string,
        requestBody?: UserApp,
    ): Promise<UserApp> {
        const result = await __request({
            method: 'PUT',
            path: `/users/${username}/apps/${userAppId}`,
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
     * Delete a (stopped) User Application instance
     * Delete a User Application instance (must be stopped)
     *
     * @param username The unique account identifier
     * @param userAppId The unique user application identifier
     * @returns UserApp OK
     * @throws ApiError
     */
    public static async deleteUserApp(
        username: string,
        userAppId: string,
    ): Promise<UserApp> {
        const result = await __request({
            method: 'DELETE',
            path: `/users/${username}/apps/${userAppId}`,
            errors: {
                401: `Not authorized`,
                403: `Forbidden`,
                404: `Not found`,
            },
        });
        return result.body;
    }

    /**
     * Retrieve a list of components in a User Application
     * Retrieve a list of components that make up a User Application
     *
     * @param username The unique account identifier
     * @param userAppId The unique user application identifier
     * @returns UserAppComponent OK
     * @throws ApiError
     */
    public static async listUserAppComponents(
        username: string,
        userAppId: string,
    ): Promise<Array<UserAppComponent>> {
        const result = await __request({
            method: 'GET',
            path: `/users/${username}/apps/${userAppId}/components`,
            errors: {
                401: `Not authorized`,
                403: `Forbidden`,
                404: `Not found`,
            },
        });
        return result.body;
    }

    /**
     * Add a component to a User Application
     * Add a component to a User Application
     *
     * @param username The unique account identifier
     * @param userAppId The unique user application identifier
     * @param requestBody
     * @returns UserApp Created
     * @throws ApiError
     */
    public static async addUserAppComponent(
        username: string,
        userAppId: string,
        requestBody?: UserAppComponent,
    ): Promise<UserApp> {
        const result = await __request({
            method: 'POST',
            path: `/users/${username}/apps/${userAppId}/components`,
            body: requestBody,
            errors: {
                401: `Not authorized`,
                403: `Forbidden`,
                409: `Conflict`,
            },
        });
        return result.body;
    }

    /**
     * Retrieve a single component of a User Application
     * Retrieve a single component of a User Application
     *
     * @param username The unique account identifier
     * @param userAppId The unique user application identifier
     * @param appComponentId The unique app component identifier
     * @returns UserAppComponent OK
     * @throws ApiError
     */
    public static async getUserAppComponentById(
        username: string,
        userAppId: string,
        appComponentId: string,
    ): Promise<UserAppComponent> {
        const result = await __request({
            method: 'GET',
            path: `/users/${username}/apps/${userAppId}/components/${appComponentId}`,
            errors: {
                401: `Not authorized`,
                403: `Forbidden`,
                404: `Not found`,
            },
        });
        return result.body;
    }

    /**
     * Update a component of a User Application
     * Update a User Application
     *
     * @param username The unique account identifier
     * @param userAppId The unique user application identifier
     * @param appComponentId The unique app component identifier
     * @param requestBody
     * @returns UserApp OK
     * @throws ApiError
     */
    public static async updateUserAppComponent(
        username: string,
        userAppId: string,
        appComponentId: string,
        requestBody?: UserAppComponent,
    ): Promise<UserApp> {
        const result = await __request({
            method: 'PUT',
            path: `/users/${username}/apps/${userAppId}/components/${appComponentId}`,
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
     * Remove a component from a User Application
     * Remove a component from a User Application
     *
     * @param username The unique account identifier
     * @param userAppId The unique user application identifier
     * @param appComponentId The unique app component identifier
     * @returns UserApp OK
     * @throws ApiError
     */
    public static async removeUserAppComponent(
        username: string,
        userAppId: string,
        appComponentId: string,
    ): Promise<UserApp> {
        const result = await __request({
            method: 'DELETE',
            path: `/users/${username}/apps/${userAppId}/components/${appComponentId}`,
            errors: {
                401: `Not authorized`,
                403: `Forbidden`,
                404: `Not found`,
            },
        });
        return result.body;
    }

    /**
     * Launch a User Application
     * Launch a User Application
     *
     * @param username The unique account identifier
     * @param userAppId The unique user application identifier
     * @param appComponentId The unique app component identifier
     * @returns UserApp Accepted
     * @throws ApiError
     */
    public static async launchUserApp(
        username: string,
        userAppId: string,
        appComponentId: string,
    ): Promise<UserApp> {
        const result = await __request({
            method: 'GET',
            path: `/users/${username}/apps/${userAppId}/start`,
            errors: {
                401: `Not authorized`,
                403: `Forbidden`,
                404: `Not found`,
            },
        });
        return result.body;
    }

    /**
     * Shutdown a User Application
     * Shutdown a User Application
     *
     * @param username The unique account identifier
     * @param userAppId The unique user application identifier
     * @param appComponentId The unique app component identifier
     * @returns UserApp Accepted
     * @throws ApiError
     */
    public static async shutdownUserApp(
        username: string,
        userAppId: string,
        appComponentId: string,
    ): Promise<UserApp> {
        const result = await __request({
            method: 'GET',
            path: `/users/${username}/apps/${userAppId}/stop`,
            errors: {
                401: `Not authorized`,
                403: `Forbidden`,
                404: `Not found`,
            },
        });
        return result.body;
    }

    /**
     * Retrieve logs from a (running) component of a User Application
     * Retrieve logs of a component of a User Application (must be running)
     *
     * @param username The unique account identifier
     * @param userAppId The unique user application identifier
     * @param appComponentId The unique app component identifier
     * @returns UserAppComponentLogs OK
     * @throws ApiError
     */
    public static async getUserAppLogsById(
        username: string,
        userAppId: string,
        appComponentId: string,
    ): Promise<UserAppComponentLogs> {
        const result = await __request({
            method: 'GET',
            path: `/users/${username}/apps/${userAppId}/components/${appComponentId}/logs`,
            errors: {
                401: `Not authorized`,
                403: `Forbidden`,
                404: `Not found`,
            },
        });
        return result.body;
    }

}