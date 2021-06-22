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
    public static async listStacks(): Promise<Array<Stack>> {
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
     * @returns any Created
     * @throws ApiError
     */
    public static async createStack(
        stack: Stack,
    ): Promise<any> {
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
    public static async getStackById(
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
     * @returns any Updated
     * @throws ApiError
     */
    public static async updateStack(
        stackId: string,
        stack: Stack,
    ): Promise<any> {
        const result = await __request({
            method: 'PUT',
            path: `/stacks/${stackId}`,
            body: stack,
        });
        return result.body;
    }

    /**
     * Delete a stack
     *
     * @param stackId The unique stack identifier
     * @returns any OK
     * @throws ApiError
     */
    public static async deleteStack(
        stackId: string,
    ): Promise<any> {
        const result = await __request({
            method: 'DELETE',
            path: `/stacks/${stackId}`,
        });
        return result.body;
    }

    /**
     * Rename the stack
     *
     * @param stackId The unique stack identifier
     * @param name Stack name
     * @returns any Updated
     * @throws ApiError
     */
    public static async renameStack(
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
     * Adds, starts, and navigates to the specified application
     *
     * @param key The key of the service spec to start and navigate to
     * @returns any OK
     * @throws ApiError
     */
    public static async quickstartStack(
        key: string,
    ): Promise<any> {
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
     * @returns any OK
     * @throws ApiError
     */
    public static async startStack(
        stackId: string,
    ): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/start/${stackId}`,
        });
        return result.body;
    }

    /**
     * Stops the specified stack
     *
     * @param stackId The unique stack identifier
     * @returns any OK
     * @throws ApiError
     */
    public static async stopStack(
        stackId: string,
    ): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/stop/${stackId}`,
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