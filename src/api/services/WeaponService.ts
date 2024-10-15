/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateWeaponDto } from '../models/CreateWeaponDto';
import type { WeaponDto } from '../models/WeaponDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class WeaponService {
    /**
     * Ajour d une arme
     * Ajoute une nouvelle arme en base de donnee
     * @param requestBody
     * @returns WeaponDto
     * @throws ApiError
     */
    public static weaponControllerCreate(
        requestBody: CreateWeaponDto,
    ): CancelablePromise<WeaponDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/weapon',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
