/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserAccount } from '../models/UserAccount';
import { request as __request } from '../core/request';

export class UserService {

    /**
     * Retrieve a list of user accounts
     * Retrieve a list of existing user accounts
     *
     * @returns UserAccount OK
     * @throws ApiError
     */
    public static async listUserAccounts(): Promise<Array<UserAccount>> {
        const result = await __request({
            method: 'GET',
            path: `/users`,
            errors: {
                401: `Not authorized`,
                403: `Forbidden`,
            },
        });
        return result.body;
    }

    /**
     * Add a new user account (admin only)
     * Add a new user account (admin only)
     *
     * @param requestBody
     * @returns UserAccount Created
     * @throws ApiError
     */
    public static async createUserAccount(
        requestBody?: UserAccount,
    ): Promise<UserAccount> {
        const result = await __request({
            method: 'POST',
            path: `/users`,
            body: requestBody,
            errors: {
                401: `Not authorized`,
                403: `Forbidden`,
            },
        });
        return result.body;
    }

    /**
     * Retrieve a user account
     * Retrieve basic information about a account
     *
     * @param username The unique account identifier
     * @returns UserAccount OK
     * @throws ApiError
     */
    public static async getUserAccountByUsername(
        username: string,
    ): Promise<UserAccount> {
        const result = await __request({
            method: 'GET',
            path: `/users/${username}`,
            errors: {
                401: `Not authorized`,
                403: `Forbidden`,
                404: `Not found`,
            },
        });
        return result.body;
    }

    /**
     * Update user account information
     * Update user account information
     *
     * @param username The unique account identifier
     * @param requestBody
     * @returns UserAccount OK
     * @throws ApiError
     */
    public static async updateUserAccount(
        username: string,
        requestBody?: UserAccount,
    ): Promise<UserAccount> {
        const result = await __request({
            method: 'PUT',
            path: `/users/${username}`,
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
     * Delete a user account
     * Delete an account
     *
     * @param username The unique account identifier
     * @returns UserAccount OK
     * @throws ApiError
     */
    public static async deleteUserAccount(
        username: string,
    ): Promise<UserAccount> {
        const result = await __request({
            method: 'DELETE',
            path: `/users/${username}`,
            errors: {
                401: `Not authorized`,
                403: `Forbidden`,
                404: `Not found`,
            },
        });
        return result.body;
    }

}