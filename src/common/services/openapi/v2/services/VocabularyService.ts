/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { VocabTerm } from '../models/VocabTerm';
import type { Vocabulary } from '../models/Vocabulary';
import { request as __request } from '../core/request';

export class VocabularyService {

    /**
     * Retrieve a list of all vocabularies
     * Retrieve a list of all vocabularies
     *
     * @returns Vocabulary OK
     * @throws ApiError
     */
    public static async listVocabularies(): Promise<Array<Vocabulary>> {
        const result = await __request({
            method: 'GET',
            path: `/vocabularies`,
        });
        return result.body;
    }

    /**
     * Retrieve a single vocabulary and all of its terms
     * Retrieve a single vocabulary and all of its terms
     *
     * @param vocabName The unique name of a vocabulary
     * @returns Vocabulary OK
     * @throws ApiError
     */
    public static async getVocabularyByName(
        vocabName: string,
    ): Promise<Vocabulary> {
        const result = await __request({
            method: 'GET',
            path: `/vocabularies/${vocabName}`,
            errors: {
                404: `Not found`,
            },
        });
        return result.body;
    }

    /**
     * Create a new vocabulary or replace the list of terms in an existing vocabulary
     * Create a new vocabulary or replace the list of terms in an existing vocabulary (upsert)
     *
     * @param vocabName The unique name of a vocabulary
     * @param requestBody
     * @returns Vocabulary OK
     * @throws ApiError
     */
    public static async updateVocabulary(
        vocabName: string,
        requestBody?: Array<VocabTerm>,
    ): Promise<Vocabulary> {
        const result = await __request({
            method: 'PUT',
            path: `/vocabularies/${vocabName}`,
            body: requestBody,
            errors: {
                304: `Not modified`,
                401: `Access token is missing or invalid`,
                403: `Forbidden`,
                409: `Conflict`,
            },
        });
        return result.body;
    }

    /**
     * Delete an entire vocabulary
     * Delete an entire vocabulary
     *
     * @param vocabName The unique name of a vocabulary
     * @returns Vocabulary OK
     * @throws ApiError
     */
    public static async deleteVocabulary(
        vocabName: string,
    ): Promise<Vocabulary> {
        const result = await __request({
            method: 'DELETE',
            path: `/vocabularies/${vocabName}`,
            errors: {
                401: `Not authorized`,
                403: `Forbidden`,
                404: `Not found`,
            },
        });
        return result.body;
    }

    /**
     * Retrieve a single vocabulary and all of its terms
     * Retrieve a single vocabulary and all of its terms
     *
     * @param vocabName The unique name of a vocabulary
     * @returns VocabTerm OK
     * @throws ApiError
     */
    public static async getVocabularyTermsByName(
        vocabName: string,
    ): Promise<Array<VocabTerm>> {
        const result = await __request({
            method: 'GET',
            path: `/vocabularies/${vocabName}/terms`,
            errors: {
                404: `Not found`,
            },
        });
        return result.body;
    }

    /**
     * Add a new term to a vocabulary
     * Add a new term to a vocabulary
     *
     * @param vocabName The unique name of a vocabulary
     * @param requestBody
     * @returns any Created
     * @throws ApiError
     */
    public static async createVocabularyTerm(
        vocabName: string,
        requestBody?: VocabTerm,
    ): Promise<{
        vocabulary?: Vocabulary,
        term?: VocabTerm,
    }> {
        const result = await __request({
            method: 'POST',
            path: `/vocabularies/${vocabName}/terms`,
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
     * Retrieve a single vocabulary term
     * Retrieve a single vocabulary term
     *
     * @param vocabName The unique name of a vocabulary
     * @param termId The unique id of a term within a vocabulary
     * @returns VocabTerm OK
     * @throws ApiError
     */
    public static async getVocabularyTermById(
        vocabName: string,
        termId: string,
    ): Promise<VocabTerm> {
        const result = await __request({
            method: 'GET',
            path: `/vocabularies/${vocabName}/terms/${termId}`,
            errors: {
                404: `Not found`,
            },
        });
        return result.body;
    }

    /**
     * Update a term within a vocabulary
     * Update a term within a vocabulary
     *
     * @param vocabName The unique name of a vocabulary
     * @param termId The unique id of a term within a vocabulary
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static async updateVocabularyTerm(
        vocabName: string,
        termId: string,
        requestBody?: VocabTerm,
    ): Promise<{
        vocabulary?: Vocabulary,
        term?: VocabTerm,
    }> {
        const result = await __request({
            method: 'PUT',
            path: `/vocabularies/${vocabName}/terms/${termId}`,
            body: requestBody,
            errors: {
                304: `Not modified`,
                401: `Not authorized`,
                403: `Forbidden`,
            },
        });
        return result.body;
    }

    /**
     * Delete a term from a vocabulary
     * Delete a term from a vocabulary
     *
     * @param vocabName The unique name of a vocabulary
     * @param termId The unique id of a term within a vocabulary
     * @returns any OK
     * @throws ApiError
     */
    public static async deleteVocabularyTerm(
        vocabName: string,
        termId: string,
    ): Promise<{
        vocabulary?: Vocabulary,
        term?: VocabTerm,
    }> {
        const result = await __request({
            method: 'DELETE',
            path: `/vocabularies/${vocabName}/terms/${termId}`,
            errors: {
                401: `Not authorized`,
                403: `Forbidden`,
                404: `Not found`,
            },
        });
        return result.body;
    }

}