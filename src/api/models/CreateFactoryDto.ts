/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CreateFactoryDto = {
    name: string;
    type: CreateFactoryDto.type;
    description: string;
};
export namespace CreateFactoryDto {
    export enum type {
        ARME = 'Arme',
        MUNITION = 'Munition',
        OPTIQUE = 'Optique',
        REDUCTEUR_DE_SON_ = 'Reducteur de son ',
    }
}

