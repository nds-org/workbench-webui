/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiRequestOptions } from './ApiRequestOptions';

type Resolver<T> = (options: ApiRequestOptions) => Promise<T>;
type Headers = Record<string, string>;

type Config = {
    BASE: string;
    VERSION: string;
    WITH_CREDENTIALS: boolean;
    TOKEN?: string | Resolver<string>;
    USERNAME?: string | Resolver<string>;
    PASSWORD?: string | Resolver<string>;
    HEADERS?: Headers | Resolver<Headers>;
}

export const OpenAPI: Config = {
    BASE: '/api/v1',
    VERSION: '2.1.2',
    WITH_CREDENTIALS: false,
    TOKEN: undefined,
    USERNAME: undefined,
    PASSWORD: undefined,
    HEADERS: undefined,
};