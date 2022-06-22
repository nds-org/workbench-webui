/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Vocabulary } from '../models/Vocabulary';
import { request as __request } from '../core/request';

export class VocabularyService {

    /**
     * Retrieves a vocabulary
     *
     * @param vocabName Vocabulary name
     * @returns Vocabulary OK
     * @throws ApiError
     */
    public static async getVocabularyByName(
        vocabName: string,
    ): Promise<Vocabulary> {
        const result = await __request({
            method: 'GET',
            path: `/vocabulary/${vocabName}`,
            errors: {
                404: `Not found`,
            },
        });
        return result.body;
    }

}