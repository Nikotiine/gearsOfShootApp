/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AmmunitionHeadTypeDto } from '../models/AmmunitionHeadTypeDto';
import type { CreateAmmunitionHeadTypeDto } from '../models/CreateAmmunitionHeadTypeDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AmmunitionHeadTypeService {
    /**
     * Ajout d une ovige
     * Creattion d un nouveau type d ogive pour les munitions
     * @param requestBody
     * @returns AmmunitionHeadTypeDto
     * @throws ApiError
     */
    public static ammunitionHeadTypeControllerCreate(
        requestBody: CreateAmmunitionHeadTypeDto,
    ): CancelablePromise<AmmunitionHeadTypeDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/ammunition-head-type',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
