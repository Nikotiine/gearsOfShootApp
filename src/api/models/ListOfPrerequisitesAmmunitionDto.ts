/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AmmunitionBodyTypeDto } from './AmmunitionBodyTypeDto';
import type { AmmunitionHeadTypeDto } from './AmmunitionHeadTypeDto';
import type { CaliberDto } from './CaliberDto';
import type { FactoryDto } from './FactoryDto';
export type ListOfPrerequisitesAmmunitionDto = {
    calibers: Array<CaliberDto>;
    factories: Array<FactoryDto>;
    headTypes: Array<AmmunitionHeadTypeDto>;
    bodyTypes: Array<AmmunitionBodyTypeDto>;
};

