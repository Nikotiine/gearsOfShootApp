/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AmmunitionDto } from '../models/AmmunitionDto';
import type { CreateAmmunitionDto } from '../models/CreateAmmunitionDto';
import type { ListOfPrerequisitesAmmunitionDto } from '../models/ListOfPrerequisitesAmmunitionDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AmmunitionService {
    /**
     * Ajouter une munition
     * Creation d une nouvelle munition en base de donnée
     * @param requestBody
     * @returns AmmunitionDto
     * @throws ApiError
     */
    public static ammunitionControllerCreate(
        requestBody: CreateAmmunitionDto,
    ): CancelablePromise<AmmunitionDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/ammunition',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Filtre par calibre
     * Retourne la liste des munitions filtre par calibre
     * @param id
     * @returns AmmunitionDto
     * @throws ApiError
     */
    public static ammunitionControllerFindByCaliber(
        id: number,
    ): CancelablePromise<Array<AmmunitionDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/ammunition/by/caliber/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Liste des pre-requis
     * Retourne la liste des pre-requis necesssaire a la creation d une nouvelle munition
     * @returns ListOfPrerequisitesAmmunitionDto
     * @throws ApiError
     */
    public static ammunitionControllerFindPrerequisitesList(): CancelablePromise<ListOfPrerequisitesAmmunitionDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/ammunition/prerequisites',
        });
    }
}
