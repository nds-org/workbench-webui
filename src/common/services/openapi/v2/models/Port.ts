/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Port = {
    protocol: 'tcp' | 'http';
    number: number;
    path: string;
    nodePort?: number;
}
