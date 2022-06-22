/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Account } from '../models/Account';
import type { Auth } from '../models/Auth';
import type { Token } from '../models/Token';
import { request as __request } from '../core/request';

export class UserAccountService {

    /**
     * Authenticate a user (login)
     *
     * @param auth Auth definition
     * @returns Token OK
     * @throws ApiError
     */
    public static async postAuthenticate(
        auth: Auth,
    ): Promise<Token> {
        const result = await __request({
            method: 'POST',
            path: `/authenticate`,
            body: auth,
            errors: {
                401: `Unauthorized - invalid credentials`,
            },
        });
        return result.body;
    }

    /**
     * Logout a user
     *
     * @returns void
     * @throws ApiError
     */
    public static async deleteAuthenticate(): Promise<void> {
        const result = await __request({
            method: 'DELETE',
            path: `/authenticate`,
        });
        return result.body;
    }

    /**
     * Refresh the JWT token
     *
     * @returns Token OK
     * @throws ApiError
     */
    public static async refreshToken(): Promise<Token> {
        const result = await __request({
            method: 'GET',
            path: `/refresh_token`,
            errors: {
                401: `Unauthorized - missing or invalid login token`,
            },
        });
        return result.body;
    }

    /**
     * Validate the JWT token
     *
     * @param host If specified, test authorization for JWT to access \ the given hostname
     * @returns any OK
     * @throws ApiError
     */
    public static async checkToken(
        host?: string,
    ): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/check_token`,
            query: {
                'host': host,
            },
            errors: {
                401: `Unauthorized - missing or invalid login token`,
            },
        });
        return result.body;
    }

    /**
     * Retrieves a site-wide list of NDSLabs accounts.
     *
     * @returns Account OK
     * @throws ApiError
     */
    public static async listAccounts(): Promise<Array<Account>> {
        const result = await __request({
            method: 'GET',
            path: `/accounts`,
            errors: {
                403: `Forbidden - user needs permissions to view other accounts`,
                404: `Not found`,
            },
        });
        return result.body;
    }

    /**
     * Adds a new accounts
     *
     * @param accounts Account definition
     * @returns Account Created
     * @throws ApiError
     */
    public static async createAccount(
        accounts: Account,
    ): Promise<Account> {
        const result = await __request({
            method: 'POST',
            path: `/accounts`,
            body: accounts,
        });
        return result.body;
    }

    /**
     * Retrieves basic information about a account.
     *
     * @param accountId The unique account identifier
     * @returns Account OK
     * @throws ApiError
     */
    public static async getAccountById(
        accountId: string,
    ): Promise<Account> {
        const result = await __request({
            method: 'GET',
            path: `/accounts/${accountId}`,
            errors: {
                404: `Not found`,
            },
        });
        return result.body;
    }

    /**
     * Updates account information
     *
     * @param accountId The unique account identifier
     * @param account Account definition
     * @returns Account Update successful
     * @throws ApiError
     */
    public static async updateAccount(
        accountId: string,
        account: Account,
    ): Promise<Account> {
        const result = await __request({
            method: 'PUT',
            path: `/accounts/${accountId}`,
            body: account,
            errors: {
                304: `Not modified - account has not changed`,
                403: `Forbidden - user needs permissions to edit other accounts`,
            },
        });
        return result.body;
    }

    /**
     * Delete an account
     *
     * @param accountId The unique account identifier
     * @returns void
     * @throws ApiError
     */
    public static async deleteAccount(
        accountId: string,
    ): Promise<void> {
        const result = await __request({
            method: 'DELETE',
            path: `/accounts/${accountId}`,
            errors: {
                403: `Forbidden - user needs permissions to edit other accounts`,
            },
        });
        return result.body;
    }

    /**
     * Check if the user has an active/valid OAuth session
     *
     * @returns string OK
     * @throws ApiError
     */
    public static async validateOAuthToken(): Promise<string> {
        const result = await __request({
            method: 'GET',
            path: `/validate`,
            errors: {
                401: `Unauthorized - missing or invalid login token`,
            },
        });
        return result.body;
    }

    /**
     * Register
     *
     * @param account Account definition
     * @returns any Created
     * @throws ApiError
     */
    public static async registerUser(
        account: Account,
    ): Promise<any> {
        const result = await __request({
            method: 'POST',
            path: `/register`,
            body: account,
        });
        return result.body;
    }

    /**
     * Change the user's password
     *
     * @param password Change password object
     * @returns any Updated
     * @throws ApiError
     */
    public static async changePassword(
        password: string,
    ): Promise<any> {
        const result = await __request({
            method: 'PUT',
            path: `/change_password`,
            body: password,
        });
        return result.body;
    }

    /**
     * @deprecated
     * Verify registered email address
     *
     * @param verify Verification object
     * @returns any Verified
     * @throws ApiError
     */
    public static async verifyEmailAddress(
        verify: {
            'u'?: string,
            't'?: string,
        },
    ): Promise<any> {
        const result = await __request({
            method: 'PUT',
            path: `/register/verify`,
            body: verify,
        });
        return result.body;
    }

    /**
     * @deprecated
     * Request password reset email.
     *
     * @param userId Username or email of the account to reset
     * @returns any OK
     * @throws ApiError
     */
    public static async sendResetPasswordEmail(
        userId: string,
    ): Promise<any> {
        const result = await __request({
            method: 'POST',
            path: `/reset`,
            query: {
                'userId': userId,
            },
        });
        return result.body;
    }

}