/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type FactoryDto = {
    name: string;
    type: FactoryDto.type;
    description: string;
    id: number;
};
export namespace FactoryDto {
    export enum type {
        ARME = 'Arme',
        MUNITION = 'Munition',
        OPTIQUE = 'Optique',
        REDUCTEUR_DE_SON_ = 'Reducteur de son ',
    }
}

