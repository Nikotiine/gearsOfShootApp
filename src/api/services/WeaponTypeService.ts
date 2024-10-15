/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateWeaponTypeDto } from '../models/CreateWeaponTypeDto';
import type { WeaponTypeDto } from '../models/WeaponTypeDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class WeaponTypeService {
    /**
     * Ajout d un type d arme
     * Ajout d un nouveau type d arme en bdd
     * @param requestBody
     * @returns WeaponTypeDto
     * @throws ApiError
     */
    public static weaponTypeControllerCreate(
        requestBody: CreateWeaponTypeDto,
    ): CancelablePromise<WeaponTypeDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/weapon-type',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
