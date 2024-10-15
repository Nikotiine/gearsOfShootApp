/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AmmunitionBodyTypeDto } from './AmmunitionBodyTypeDto';
import type { AmmunitionHeadTypeDto } from './AmmunitionHeadTypeDto';
import type { CaliberDto } from './CaliberDto';
import type { FactoryDto } from './FactoryDto';
export type CreateAmmunitionDto = {
    name: string;
    description: string;
    category: CreateAmmunitionDto.category;
    initialSpeed: number;
    percussionType: CreateAmmunitionDto.percussionType;
    packaging: number;
    headType: AmmunitionHeadTypeDto;
    bodyType: AmmunitionBodyTypeDto;
    factory: FactoryDto;
    caliber: CaliberDto;
};
export namespace CreateAmmunitionDto {
    export enum category {
        A = 'A',
        B = 'B',
        C = 'C',
        D = 'D',
    }
    export enum percussionType {
        CENTRALE = 'Centrale',
        ANNULAIRE = 'Annulaire',
    }
}

