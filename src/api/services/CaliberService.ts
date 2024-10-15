/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CaliberDto } from '../models/CaliberDto';
import type { CreateCaliberDto } from '../models/CreateCaliberDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CaliberService {
    /**
     * Ajout d un calibre
     * Ajout d un nouveau calibre en base de donnee
     * @param requestBody
     * @returns CaliberDto
     * @throws ApiError
     */
    public static caliberControllerCreate(
        requestBody: CreateCaliberDto,
    ): CancelablePromise<CaliberDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/caliber',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
