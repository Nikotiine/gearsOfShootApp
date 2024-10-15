/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AmmunitionBodyTypeDto } from '../models/AmmunitionBodyTypeDto';
import type { CreateAmmunitionBodyTypeDto } from '../models/CreateAmmunitionBodyTypeDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AmmunitionBodyTypeService {
    /**
     * Ajout d un type de douille
     * Creattion d un nouveau type de douille pour les munitions
     * @param requestBody
     * @returns AmmunitionBodyTypeDto
     * @throws ApiError
     */
    public static ammunitionBodyTypeControllerCreate(
        requestBody: CreateAmmunitionBodyTypeDto,
    ): CancelablePromise<AmmunitionBodyTypeDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/ammunition-body-type',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
