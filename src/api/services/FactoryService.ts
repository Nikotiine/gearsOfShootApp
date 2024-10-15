/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateFactoryDto } from '../models/CreateFactoryDto';
import type { FactoryDto } from '../models/FactoryDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class FactoryService {
    /**
     * Get all factories
     * Retourne toutes les marques sans distinction
     * @returns FactoryDto
     * @throws ApiError
     */
    public static factoryControllerFindAll(): CancelablePromise<Array<FactoryDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/factory/all',
        });
    }
    /**
     * Get all factories by type
     * Retourne toutes les marques suivant leur type
     * @param type
     * @returns FactoryDto
     * @throws ApiError
     */
    public static factoryControllerFindByType(
        type: string,
    ): CancelablePromise<Array<FactoryDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/factory/by/{type}',
            path: {
                'type': type,
            },
        });
    }
    /**
     * Ajout d une marque
     * Ajout d une nouvelle marque pour un type FactoryType
     * @param requestBody
     * @returns FactoryDto
     * @throws ApiError
     */
    public static factoryControllerCreate(
        requestBody: CreateFactoryDto,
    ): CancelablePromise<FactoryDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/factory',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
