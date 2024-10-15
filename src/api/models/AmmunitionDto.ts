/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AmmunitionBodyTypeDto } from './AmmunitionBodyTypeDto';
import type { AmmunitionHeadTypeDto } from './AmmunitionHeadTypeDto';
import type { CaliberDto } from './CaliberDto';
import type { FactoryDto } from './FactoryDto';
export type AmmunitionDto = {
    name: string;
    description: string;
    category: AmmunitionDto.category;
    initialSpeed: number;
    percussionType: AmmunitionDto.percussionType;
    packaging: number;
    headType: AmmunitionHeadTypeDto;
    bodyType: AmmunitionBodyTypeDto;
    factory: FactoryDto;
    caliber: CaliberDto;
    id: number;
};
export namespace AmmunitionDto {
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

