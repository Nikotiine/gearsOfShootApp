/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TokenDto } from '../models/TokenDto';
import type { UserCredentialDto } from '../models/UserCredentialDto';
import type { UserDto } from '../models/UserDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AuthenticationService {
    /**
     * Login
     * Connexion a l'application
     * @param requestBody
     * @returns TokenDto
     * @throws ApiError
     */
    public static authControllerLogin(
        requestBody: UserCredentialDto,
    ): CancelablePromise<TokenDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/login',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Profil par token
     * Autentification du token et retour du profil
     * @returns UserDto
     * @throws ApiError
     */
    public static authControllerMe(): CancelablePromise<UserDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/auth/me',
        });
    }
}
