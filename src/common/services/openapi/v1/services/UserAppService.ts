/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Config } from '../models/Config';
import type { Log } from '../models/Log';
import type { Stack } from '../models/Stack';
import { request as __request } from '../core/request';

export class UserAppService {

    /**
     * Retrieves a list of stacks for this account.
     *
     * @returns Stack OK
     * @throws ApiError
     */
    public static async listUserapps(): Promise<Array<Stack>> {
        const result = await __request({
            method: 'GET',
            path: `/stacks`,
            errors: {
                404: `Not found`,
            },
        });
        return result.body;
    }

    /**
     * Adds a new stack to this account
     *
     * @param stack Stack definition
     * @returns Stack Created
     * @throws ApiError
     */
    public static async createUserapp(
        stack: Stack,
    ): Promise<Stack> {
        const result = await __request({
            method: 'POST',
            path: `/stacks`,
            body: stack,
        });
        return result.body;
    }

    /**
     * Retrieves the stack definition.
     *
     * @param stackId The unique stack identifier
     * @returns Stack OK
     * @throws ApiError
     */
    public static async getUserappById(
        stackId: string,
    ): Promise<Stack> {
        const result = await __request({
            method: 'GET',
            path: `/stacks/${stackId}`,
        });
        return result.body;
    }

    /**
     * Updates stack information
     *
     * @param stackId The unique stack identifier
     * @param stack Stack definition
     * @returns Stack OK
     * @throws ApiError
     */
    public static async updateUserapp(
        stackId: string,
        stack: Stack,
    ): Promise<Stack> {
        const result = await __request({
            method: 'PUT',
            path: `/stacks/${stackId}`,
            body: stack,
            errors: {
                304: `Not modified - userapp has not changed`,
            },
        });
        return result.body;
    }

    /**
     * Delete a stack
     *
     * @param stackId The unique stack identifier
     * @returns void
     * @throws ApiError
     */
    public static async deleteUserapp(
        stackId: string,
    ): Promise<void> {
        const result = await __request({
            method: 'DELETE',
            path: `/stacks/${stackId}`,
        });
        return result.body;
    }

    /**
     * @deprecated
     * Rename the stack
     *
     * @param stackId The unique stack identifier
     * @param name Stack name
     * @returns any OK
     * @throws ApiError
     */
    public static async renameUserapp(
        stackId: string,
        name: string,
    ): Promise<any> {
        const result = await __request({
            method: 'PUT',
            path: `/stacks/${stackId}/rename`,
            body: name,
        });
        return result.body;
    }

    /**
     * Retrieves the stack service log.
     *
     * @param stackServiceId The unique stack service identifier
     * @returns Log OK
     * @throws ApiError
     */
    public static async getStackServiceLogs(
        stackServiceId: string,
    ): Promise<Log> {
        const result = await __request({
            method: 'GET',
            path: `/logs/${stackServiceId}`,
        });
        return result.body;
    }

    /**
     * Quickstarts (adds, starts, and navigates to) the specified application
     *
     * @param key The key of the service spec to start and navigate to
     * @returns Stack OK
     * @throws ApiError
     */
    public static async quickstartStack(
        key: string,
    ): Promise<Stack> {
        const result = await __request({
            method: 'GET',
            path: `/start`,
            query: {
                'key': key,
            },
            errors: {
                400: `Application key was not given`,
                404: `Application key was not found`,
            },
        });
        return result.body;
    }

    /**
     * Starts the specified stack
     *
     * @param stackId The unique stack identifier
     * @returns Stack OK
     * @throws ApiError
     */
    public static async startStack(
        stackId: string,
    ): Promise<Stack> {
        const result = await __request({
            method: 'GET',
            path: `/start/${stackId}`,
            errors: {
                401: `Unauthorized - missing or invalid login token`,
                403: `Forbidden - missing required scope`,
                404: `Not found`,
            },
        });
        return result.body;
    }

    /**
     * Stops the specified stack
     *
     * @param stackId The unique stack identifier
     * @returns Stack OK
     * @throws ApiError
     */
    public static async stopStack(
        stackId: string,
    ): Promise<Stack> {
        const result = await __request({
            method: 'GET',
            path: `/stop/${stackId}`,
            errors: {
                401: `Unauthorized - missing or invalid login token`,
                403: `Forbidden - missing required scope`,
                404: `Not found`,
            },
        });
        return result.body;
    }

    /**
     * Retrieves a list of service configuration options
     *
     * @param services services to filter by
     * @returns Config OK
     * @throws ApiError
     */
    public static async getStackConfigs(
        services?: Array<string>,
    ): Promise<Array<Config>> {
        const result = await __request({
            method: 'GET',
            path: `/configs`,
            query: {
                'services': services,
            },
        });
        return result.body;
    }

}