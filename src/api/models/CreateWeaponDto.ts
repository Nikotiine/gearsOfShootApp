/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CaliberDto } from './CaliberDto';
import type { FactoryDto } from './FactoryDto';
import type { ThreadedSizeDto } from './ThreadedSizeDto';
import type { WeaponTypeDto } from './WeaponTypeDto';
export type CreateWeaponDto = {
    name: string;
    description: string;
    variation: string;
    category: CreateWeaponDto.category;
    caliber: CaliberDto;
    factory: FactoryDto;
    type: WeaponTypeDto;
    barrelLength: number;
    isOpticReady: boolean;
    isAdjustableTrigger: boolean;
    isThreadedBarrel: boolean;
    barrelType: CreateWeaponDto.barrelType;
    threadedSize: ThreadedSizeDto;
};
export namespace CreateWeaponDto {
    export enum category {
        A = 'A',
        B = 'B',
        C = 'C',
        D = 'D',
    }
    export enum barrelType {
        NORMAL = 'Normal',
        SEMI_LOURD = 'Semi lourd',
        LOURD = 'Lourd',
    }
}

