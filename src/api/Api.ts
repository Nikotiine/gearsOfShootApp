/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface FactoryTypeDto {
  /** @example "Arme" */
  name: string
  id: number
}

export interface FactoryDto {
  id: number
  /** @example "Une description de la marque et ses produits" */
  description: string
  reference: string
  type: FactoryTypeDto
  /** @example "Colt" */
  name: string
}

export interface ListOfPrerequisitesFactoryDto {
  types: FactoryTypeDto[]
}

export interface CreateFactoryDto {
  /** @example "Colt" */
  name: string
  typeId: number
  /** @example "Une description de la marque et ses produits" */
  description: string
  reference: string
}

export interface EditFactoryDto {
  /** @example "Colt" */
  name: string
  typeId: number
  /** @example "Une description de la marque et ses produits" */
  description: string
  reference: string
  id: number
}

export interface ApiDeleteResponseDto {
  id: number
  isSuccess: boolean
  message: string
}

export interface CaliberDto {
  /** @example "17 HMR" */
  name: string
  reference: string
  id: number
}

export interface CreateCaliberDto {
  /** @example "17 HMR" */
  name: string
  reference: string
}

export interface ThreadedSizeDto {
  /** @example "1/2 x 28" */
  size: string
  reference: string
  id: number
}

export interface CreateThreadedSizeDto {
  /** @example "1/2 x 28" */
  size: string
  reference: string
}

export interface LegislationCategoryDto {
  id: number
  name: string
}

export interface WeaponReloadModeDto {
  id: number
  name: string
}

export interface WeaponTypeDto {
  id: number
  /** @example "Fusil a verrou" */
  name: string
  mode: WeaponReloadModeDto
  reference: string
}

export interface PercussionTypeDto {
  id: number
  name: string
}

export interface WeaponBarrelTypeDto {
  id: number
  name: string
}

export interface MaterialDto {
  id: number
  name: string
}

export interface RailSizeDto {
  id: number
  name: string
  reference: string
}

export interface WeaponTriggerTypeDto {
  id: number
  name: string
  reference: string
}

export interface ColorDto {
  id: number
  name: string
  reference: string
}

export interface OpticReadyPlateDto {
  id: number
  name: string
  description: string
  reference: string
}

export interface ListOfPrerequisitesWeaponDto {
  calibers: CaliberDto[]
  factories: FactoryDto[]
  types: WeaponTypeDto[]
  threadedSizes: ThreadedSizeDto[]
  percussionTypes: PercussionTypeDto[]
  categories: LegislationCategoryDto[]
  barreTypes: WeaponBarrelTypeDto[]
  buttTypes: MaterialDto[]
  railSizes: RailSizeDto[]
  triggerTypes: WeaponTriggerTypeDto[]
  colors: ColorDto[]
  opticReadyPlates: OpticReadyPlateDto[]
}

export interface ListOfPrerequisitesWeaponTypeDto {
  modes: WeaponReloadModeDto[]
}

export interface CreateWeaponTypeDto {
  /** @example "Fusil a verrou" */
  name: string
  modeId: number
  reference: string
}

export interface UpdateWeaponTypeDto {
  /** @example "Fusil a verrou" */
  name: string
  modeId: number
  reference: string
  id: number
}

export interface WeaponMagazineDto {
  id: number
  capacity: number
  length: number
  height: number
  width: number
  reference: string
  body: MaterialDto
  factory: FactoryDto
  caliber: CaliberDto
}

export interface ListOfPrerequisitesWeaponMagazineDto {
  calibers: CaliberDto[]
  factories: FactoryDto[]
  bodies: MaterialDto[]
}

export interface CreateWeaponMagazineDto {
  capacity: number
  length: number
  height: number
  width: number
  reference: string
  bodyId: number
  factoryId: number
  caliberId: number
  description: string | null
}

export interface UpdateWeaponMagazineDto {
  capacity: number
  length: number
  height: number
  width: number
  reference: string
  bodyId: number
  factoryId: number
  caliberId: number
  description: string | null
  id: number
}

export interface SoundNoiseReducerDto {
  id: number
  caliber: CaliberDto
  factory: FactoryDto
  threadedSize: ThreadedSizeDto
  diameter: number
  length: number
  name: string
  description: string
  reference: string
  isCleanable: boolean
}

export interface ListOfPrerequisitesSoundNoiseReducerDto {
  calibers: CaliberDto[]
  factories: FactoryDto[]
  threadedSizes: ThreadedSizeDto[]
}

export interface CreateSoundNoiseReducerDto {
  caliberId: number
  factoryId: number
  threadedSizeId: number
  diameter: number
  length: number
  name: string
  description: string
  reference: string
  isCleanable: boolean
}

export interface UpdateSoundNoiseReducerDto {
  caliberId: number
  factoryId: number
  threadedSizeId: number
  diameter: number
  length: number
  name: string
  description: string
  reference: string
  isCleanable: boolean
  id: number
}

export interface HandGunDto {
  id: number
  /** @example "CZ-457-VAR-22LR" */
  reference: string
  /** @example "CZ 457" */
  name: string
  /** @example "Une description de l arme son histoire ..." */
  description: string
  /** @example "Varmint ou Luxe" */
  variation: string | null
  /** @example "C" */
  category: LegislationCategoryDto
  caliber: CaliberDto
  factory: FactoryDto
  type: WeaponTypeDto
  /** @example 51 */
  barrelLength: number
  /** @example false */
  isAdjustableTrigger: boolean
  /** @example false */
  isThreadedBarrel: boolean
  /** @example "Lourd" */
  barrelType: WeaponBarrelTypeDto
  threadedSize: ThreadedSizeDto
  adjustableTriggerValue: string
  percussionType: PercussionTypeDto
  providedMagazineQuantity: number
  providedMagazine: WeaponMagazineDto
  barrelSize: number
  buttMaterial: MaterialDto
  /** Guidon reglable */
  isAdjustableFrontSight: boolean
  /** Hausse reglable */
  isAdjustableBackSight: boolean
  buttColor: ColorDto
  barrelColor: ColorDto
  /** @example true */
  isOpticReady: boolean
  decocking: boolean
  triggerType: WeaponTriggerTypeDto
  slideColor: ColorDto
  slideMaterial: MaterialDto
  isExternalHammer: boolean
  opticReadyPlates: OpticReadyPlateDto[]
  /** Rail picatiny */
  isPicatinyRailSlop: boolean
}

export interface CreateHandGunDto {
  /**
   * Nom du model de l arme
   * @example "CZ 457"
   */
  name: string
  /** @example "Une description de l arme son histoire ..." */
  description: string | null
  /**
   * Variante du modele
   * @example "Varmint ou Luxe"
   */
  variation: string | null
  /** La categorie de l arme en france */
  categoryId: number
  /** Le calibre de l arme */
  caliberId: number
  /** la marque */
  factoryId: number
  /**
   * Type d arme
   * @example "Fusil a verrou"
   */
  typeId: number
  /**
   * La longueur du canon en cm
   * @example 51
   */
  barrelLength: number
  /**
   * Si le poid de depart de la detente est reglable
   * @example false
   */
  isAdjustableTrigger: boolean
  /**
   * Si le canon est fillete
   * @example false
   */
  isThreadedBarrel: boolean
  /** Le type de canon (lourd/leger...) */
  barrelTypeId: number
  /** Les dimmension du filletage */
  threadedSizeId: number | null
  /**
   * les valeurs de poids depart de la detente
   * @example "Entre 1 et 2kg"
   */
  adjustableTriggerValue: string | null
  /** Le type de percussion ( annulaire ou centrale ) */
  percussionTypeId: number
  /**
   * Le nombre de chargeur fournis
   * @example 1
   */
  providedMagazineQuantity: number
  /** Le modele de chargeur fournis */
  providedMagazineId: number | null
  /**
   * L'epaisseur exterieur du canon
   * @example 18
   */
  barrelSize: number
  /** La matiere de la crosse ou caracasse */
  buttMaterialId: number | null
  /** Guidon reglable */
  isAdjustableFrontSight: boolean
  /** Hausse reglable */
  isAdjustableBackSight: boolean
  /** la couleur de la crosse */
  buttColorId: number | null
  /** la couleur du canon  */
  barrelColorId: number | null
  /** @example true */
  isOpticReady: boolean
  decocking: boolean
  triggerTypeId: number
  slideColorId: number
  slideMaterialId: number
  isExternalHammer: boolean
  providedOpticReadyPlates: OpticReadyPlateDto[] | null
  /** Rail picatiny */
  isPicatinyRailSlop: boolean
}

export interface UpdateHandGunDto {
  /**
   * Nom du model de l arme
   * @example "CZ 457"
   */
  name: string
  /** @example "Une description de l arme son histoire ..." */
  description: string | null
  /**
   * Variante du modele
   * @example "Varmint ou Luxe"
   */
  variation: string | null
  /** La categorie de l arme en france */
  categoryId: number
  /** Le calibre de l arme */
  caliberId: number
  /** la marque */
  factoryId: number
  /**
   * Type d arme
   * @example "Fusil a verrou"
   */
  typeId: number
  /**
   * La longueur du canon en cm
   * @example 51
   */
  barrelLength: number
  /**
   * Si le poid de depart de la detente est reglable
   * @example false
   */
  isAdjustableTrigger: boolean
  /**
   * Si le canon est fillete
   * @example false
   */
  isThreadedBarrel: boolean
  /** Le type de canon (lourd/leger...) */
  barrelTypeId: number
  /** Les dimmension du filletage */
  threadedSizeId: number | null
  /**
   * les valeurs de poids depart de la detente
   * @example "Entre 1 et 2kg"
   */
  adjustableTriggerValue: string | null
  /** Le type de percussion ( annulaire ou centrale ) */
  percussionTypeId: number
  /**
   * Le nombre de chargeur fournis
   * @example 1
   */
  providedMagazineQuantity: number
  /** Le modele de chargeur fournis */
  providedMagazineId: number | null
  /**
   * L'epaisseur exterieur du canon
   * @example 18
   */
  barrelSize: number
  /** La matiere de la crosse ou caracasse */
  buttMaterialId: number | null
  /** Guidon reglable */
  isAdjustableFrontSight: boolean
  /** Hausse reglable */
  isAdjustableBackSight: boolean
  /** la couleur de la crosse */
  buttColorId: number | null
  /** la couleur du canon  */
  barrelColorId: number | null
  /** @example true */
  isOpticReady: boolean
  decocking: boolean
  triggerTypeId: number
  slideColorId: number
  slideMaterialId: number
  isExternalHammer: boolean
  providedOpticReadyPlates: OpticReadyPlateDto[] | null
  /** Rail picatiny */
  isPicatinyRailSlop: boolean
  id: number
}

export interface RiffleDto {
  id: number
  /** @example "CZ-457-VAR-22LR" */
  reference: string
  /** @example "CZ 457" */
  name: string
  /** @example "Une description de l arme son histoire ..." */
  description: string
  /** @example "Varmint ou Luxe" */
  variation: string | null
  /** @example "C" */
  category: LegislationCategoryDto
  caliber: CaliberDto
  factory: FactoryDto
  type: WeaponTypeDto
  /** @example 51 */
  barrelLength: number
  /** @example false */
  isAdjustableTrigger: boolean
  /** @example false */
  isThreadedBarrel: boolean
  /** @example "Lourd" */
  barrelType: WeaponBarrelTypeDto
  threadedSize: ThreadedSizeDto
  adjustableTriggerValue: string
  percussionType: PercussionTypeDto
  providedMagazineQuantity: number
  providedMagazine: WeaponMagazineDto
  barrelSize: number
  buttMaterial: MaterialDto
  /** Guidon reglable */
  isAdjustableFrontSight: boolean
  /** Hausse reglable */
  isAdjustableBackSight: boolean
  buttColor: ColorDto
  barrelColor: ColorDto
  /** Crosse ajustable en profondeur */
  isAdjustableButt: boolean
  /** Busc adjutable */
  isAdjustableBusk: boolean
  railSize: RailSizeDto
  /** Grenadiere */
  grenadierSlot: number
  /** Port QC */
  qcSlot: number
  /** Rail Mlock */
  isMlockCompatibility: boolean
  /** Visee ouverte ? */
  isOpenAim: boolean
  mLockOptions: string | null
}

export interface CreateRiffleDto {
  /**
   * Nom du model de l arme
   * @example "CZ 457"
   */
  name: string
  /** @example "Une description de l arme son histoire ..." */
  description: string | null
  /**
   * Variante du modele
   * @example "Varmint ou Luxe"
   */
  variation: string | null
  /** La categorie de l arme en france */
  categoryId: number
  /** Le calibre de l arme */
  caliberId: number
  /** la marque */
  factoryId: number
  /**
   * Type d arme
   * @example "Fusil a verrou"
   */
  typeId: number
  /**
   * La longueur du canon en cm
   * @example 51
   */
  barrelLength: number
  /**
   * Si le poid de depart de la detente est reglable
   * @example false
   */
  isAdjustableTrigger: boolean
  /**
   * Si le canon est fillete
   * @example false
   */
  isThreadedBarrel: boolean
  /** Le type de canon (lourd/leger...) */
  barrelTypeId: number
  /** Les dimmension du filletage */
  threadedSizeId: number | null
  /**
   * les valeurs de poids depart de la detente
   * @example "Entre 1 et 2kg"
   */
  adjustableTriggerValue: string | null
  /** Le type de percussion ( annulaire ou centrale ) */
  percussionTypeId: number
  /**
   * Le nombre de chargeur fournis
   * @example 1
   */
  providedMagazineQuantity: number
  /** Le modele de chargeur fournis */
  providedMagazineId: number | null
  /**
   * L'epaisseur exterieur du canon
   * @example 18
   */
  barrelSize: number
  /** La matiere de la crosse ou caracasse */
  buttMaterialId: number | null
  /** Guidon reglable */
  isAdjustableFrontSight: boolean
  /** Hausse reglable */
  isAdjustableBackSight: boolean
  /** la couleur de la crosse */
  buttColorId: number | null
  /** la couleur du canon  */
  barrelColorId: number | null
  /** Crosse ajustable en profondeur */
  isAdjustableButt: boolean
  /** Busc adjutable */
  isAdjustableBusk: boolean
  railSizeId: number | null
  /** Grenadiere */
  grenadierSlot: number
  /** Port QC */
  qcSlot: number
  /** Rail Mlock */
  isMlockCompatibility: boolean
  /** Visee ouverte ? */
  isOpenAim: boolean
  mLockOptions: string | null
}

export interface UpdateRiffleDto {
  /**
   * Nom du model de l arme
   * @example "CZ 457"
   */
  name: string
  /** @example "Une description de l arme son histoire ..." */
  description: string | null
  /**
   * Variante du modele
   * @example "Varmint ou Luxe"
   */
  variation: string | null
  /** La categorie de l arme en france */
  categoryId: number
  /** Le calibre de l arme */
  caliberId: number
  /** la marque */
  factoryId: number
  /**
   * Type d arme
   * @example "Fusil a verrou"
   */
  typeId: number
  /**
   * La longueur du canon en cm
   * @example 51
   */
  barrelLength: number
  /**
   * Si le poid de depart de la detente est reglable
   * @example false
   */
  isAdjustableTrigger: boolean
  /**
   * Si le canon est fillete
   * @example false
   */
  isThreadedBarrel: boolean
  /** Le type de canon (lourd/leger...) */
  barrelTypeId: number
  /** Les dimmension du filletage */
  threadedSizeId: number | null
  /**
   * les valeurs de poids depart de la detente
   * @example "Entre 1 et 2kg"
   */
  adjustableTriggerValue: string | null
  /** Le type de percussion ( annulaire ou centrale ) */
  percussionTypeId: number
  /**
   * Le nombre de chargeur fournis
   * @example 1
   */
  providedMagazineQuantity: number
  /** Le modele de chargeur fournis */
  providedMagazineId: number | null
  /**
   * L'epaisseur exterieur du canon
   * @example 18
   */
  barrelSize: number
  /** La matiere de la crosse ou caracasse */
  buttMaterialId: number | null
  /** Guidon reglable */
  isAdjustableFrontSight: boolean
  /** Hausse reglable */
  isAdjustableBackSight: boolean
  /** la couleur de la crosse */
  buttColorId: number | null
  /** la couleur du canon  */
  barrelColorId: number | null
  /** Crosse ajustable en profondeur */
  isAdjustableButt: boolean
  /** Busc adjutable */
  isAdjustableBusk: boolean
  railSizeId: number | null
  /** Grenadiere */
  grenadierSlot: number
  /** Port QC */
  qcSlot: number
  /** Rail Mlock */
  isMlockCompatibility: boolean
  /** Visee ouverte ? */
  isOpenAim: boolean
  mLockOptions: string | null
  id: number
}

export interface AmmunitionHeadTypeDto {
  /** @example "Full metal jacket" */
  name: string
  reference: string
  id: number
}

export interface AmmunitionBodyTypeDto {
  /** @example "Laiton" */
  name: string
  reference: string
  id: number
}

export interface AmmunitionDto {
  id: number
  reference: string
  /** @example "Sk Standard" */
  name: string
  /** @example "Une description de la munition, qualite / origine / conseil d utilisation" */
  description: string | null
  /** @example "C" */
  category: LegislationCategoryDto
  /** @example 320 */
  initialSpeed: number
  percussionType: PercussionTypeDto
  /** @example 50 */
  packaging: number
  headType: AmmunitionHeadTypeDto
  bodyType: AmmunitionBodyTypeDto
  factory: FactoryDto
  caliber: CaliberDto
}

export interface ListOfPrerequisitesAmmunitionDto {
  calibers: CaliberDto[]
  factories: FactoryDto[]
  headTypes: AmmunitionHeadTypeDto[]
  bodyTypes: AmmunitionBodyTypeDto[]
  categories: LegislationCategoryDto[]
  percussionTypes: PercussionTypeDto[]
}

export interface CreateAmmunitionDto {
  /** @example "Sk Standard" */
  name: string
  /** @example "Une description de la munition, qualite / origine / conseil d utilisation" */
  description: string | null
  categoryId: number
  /** @example 320 */
  initialSpeed: number
  percussionTypeId: number
  /** @example 50 */
  packaging: number
  headTypeId: number
  bodyTypeId: number
  factoryId: number
  caliberId: number
}

export interface UpdateAmmunitionDto {
  /** @example "Sk Standard" */
  name: string
  /** @example "Une description de la munition, qualite / origine / conseil d utilisation" */
  description: string | null
  categoryId: number
  /** @example 320 */
  initialSpeed: number
  percussionTypeId: number
  /** @example 50 */
  packaging: number
  headTypeId: number
  bodyTypeId: number
  factoryId: number
  caliberId: number
  id: number
}

export interface CreateAmmunitionHeadTypeDto {
  /** @example "Full metal jacket" */
  name: string
  reference: string
}

export interface CreateAmmunitionBodyTypeDto {
  /** @example "Laiton" */
  name: string
  reference: string
}

export interface CreateUserDto {
  email: string
  password: string
  firstName: string
  lastName: string
  address: string
  phone: string
  city: string
  state: string
  zipCode: string
  role: CreateUserDtoRoleEnum
}

export interface UserDto {
  id: number
  email: string
  firstName: string
  lastName: string
  address: string
  phone: string
  city: string
  state: string
  zipCode: string
  role: UserDtoRoleEnum
}

export interface UserCredentialDto {
  email: string
  password: string
}

export interface TokenDto {
  accessToken: string
}

export interface OpticUnitDto {
  id: number
  name: string
}

export interface FocalPlaneDto {
  id: number
  name: string
}

export interface OpticTypeDto {
  name: string
  reference: string
  id: number
}

export interface OpticDto {
  id: number
  name: string
  factory: FactoryDto
  /** @example "Une description de l optique ..." */
  description: string | null
  maxZoom: number
  minZoom: number
  maxDrift: number
  maxElevation: number
  valueOfOneClick: number
  bodyDiameter: number
  lensDiameter: number
  minParallax: number
  maxParallax: number
  isParallax: boolean
  opticUnit: OpticUnitDto
  focalPlane: FocalPlaneDto
  type: OpticTypeDto
}

export interface ListOfPrerequisitesOpticDto {
  types: OpticTypeDto[]
  factories: FactoryDto[]
  units: OpticUnitDto[]
  focalPlanes: FocalPlaneDto[]
}

export interface CreateOpticDto {
  name: string
  factoryId: number
  /** @example "Une description de l optique ..." */
  description: string | null
  maxZoom: number
  minZoom: number
  maxDrift: number
  maxElevation: number
  valueOfOneClick: number
  bodyDiameter: number
  lensDiameter: number
  minParallax: number
  maxParallax: number
  isParallax: boolean
  opticUnitId: number
  focalPlaneId: number
  opticTypeId: number
}

export interface UpdateOpticDto {
  name: string
  factoryId: number
  /** @example "Une description de l optique ..." */
  description: string | null
  maxZoom: number
  minZoom: number
  maxDrift: number
  maxElevation: number
  valueOfOneClick: number
  bodyDiameter: number
  lensDiameter: number
  minParallax: number
  maxParallax: number
  isParallax: boolean
  opticUnitId: number
  focalPlaneId: number
  opticTypeId: number
  id: number
}

export interface CreateOpticTypeDto {
  name: string
  reference: string
}

export enum CreateUserDtoRoleEnum {
  USER = 'USER',
  ADMIN = 'ADMIN'
}

export enum UserDtoRoleEnum {
  USER = 'USER',
  ADMIN = 'ADMIN'
}

import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  HeadersDefaults,
  ResponseType
} from 'axios'
import axios from 'axios'

export type QueryParamsType = Record<string | number, any>

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, 'data' | 'params' | 'url' | 'responseType'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean
  /** request path */
  path: string
  /** content type of request body */
  type?: ContentType
  /** query params */
  query?: QueryParamsType
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType
  /** request body */
  body?: unknown
}

export type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path'>

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, 'data' | 'cancelToken'> {
  securityWorker?: (
    securityData: SecurityDataType | null
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void
  secure?: boolean
  format?: ResponseType
}

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain'
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance
  private securityData: SecurityDataType | null = null
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker']
  private secure?: boolean
  private format?: ResponseType

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || '' })
    this.secure = secure
    this.format = format
    this.securityWorker = securityWorker
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data
  }

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method)

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {})
      }
    }
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === 'object' && formItem !== null) {
      return JSON.stringify(formItem)
    } else {
      return `${formItem}`
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key]
      const propertyContent: any[] = property instanceof Array ? property : [property]

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem))
      }

      return formData
    }, new FormData())
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {}
    const requestParams = this.mergeRequestParams(params, secureParams)
    const responseFormat = format || this.format || undefined

    if (type === ContentType.FormData && body && body !== null && typeof body === 'object') {
      body = this.createFormData(body as Record<string, unknown>)
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== 'string') {
      body = JSON.stringify(body)
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { 'Content-Type': type } : {})
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path
    })
  }
}

/**
 * @title Gears of shoot
 * @version 1.0
 * @contact
 *
 * Gears of shoot API
 */
export class ApiService<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * @description Retourne la listes de toutes les marques sans distinction
     *
     * @tags Factory
     * @name FactoryControllerFindAll
     * @summary Liste complete
     * @request GET:/api/factory/all
     */
    factoryControllerFindAll: (params: RequestParams = {}) =>
      this.request<FactoryDto[], any>({
        path: `/api/factory/all`,
        method: 'GET',
        format: 'json',
        ...params
      }),

    /**
     * @description Retourne la liste des marques suivant leur type
     *
     * @tags Factory
     * @name FactoryControllerFindByType
     * @summary Liste par type
     * @request GET:/api/factory/by/{type}
     */
    factoryControllerFindByType: (type: string, params: RequestParams = {}) =>
      this.request<FactoryDto[], any>({
        path: `/api/factory/by/${type}`,
        method: 'GET',
        format: 'json',
        ...params
      }),

    /**
     * @description Retourne la liste des pre-requis necesssaire a la creation d une marque
     *
     * @tags Factory
     * @name FactoryControllerFindPrerequisitesFactoryList
     * @summary Pre-requis de creation
     * @request GET:/api/factory/prerequisites
     */
    factoryControllerFindPrerequisitesFactoryList: (params: RequestParams = {}) =>
      this.request<ListOfPrerequisitesFactoryDto, any>({
        path: `/api/factory/prerequisites`,
        method: 'GET',
        format: 'json',
        ...params
      }),

    /**
     * @description Ajout d une nouvelle marque pour un type specifique et retourne le dto apres creation
     *
     * @tags Factory
     * @name FactoryControllerCreate
     * @summary Ajout
     * @request POST:/api/factory
     */
    factoryControllerCreate: (data: CreateFactoryDto, params: RequestParams = {}) =>
      this.request<FactoryDto, any>({
        path: `/api/factory`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Edition d une marque (ne pas editier son type)
     *
     * @tags Factory
     * @name FactoryControllerEdit
     * @summary Edition
     * @request PUT:/api/factory/{id}
     */
    factoryControllerEdit: (id: number, data: EditFactoryDto, params: RequestParams = {}) =>
      this.request<FactoryDto, any>({
        path: `/api/factory/${id}`,
        method: 'PUT',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Sppression logique de la marque
     *
     * @tags Factory
     * @name FactoryControllerDelete
     * @summary Suppression logique
     * @request DELETE:/api/factory/{id}
     */
    factoryControllerDelete: (id: number, params: RequestParams = {}) =>
      this.request<ApiDeleteResponseDto, any>({
        path: `/api/factory/${id}`,
        method: 'DELETE',
        format: 'json',
        ...params
      }),

    /**
     * @description Retourne la liste de tous les calibres disponible
     *
     * @tags Caliber
     * @name CaliberControllerFindAllCalibers
     * @summary Liste complete
     * @request GET:/api/caliber
     */
    caliberControllerFindAllCalibers: (params: RequestParams = {}) =>
      this.request<CaliberDto[], any>({
        path: `/api/caliber`,
        method: 'GET',
        format: 'json',
        ...params
      }),

    /**
     * @description Ajout d un nouveau calibre en base de donnee
     *
     * @tags Caliber
     * @name CaliberControllerCreate
     * @summary Ajout
     * @request POST:/api/caliber
     */
    caliberControllerCreate: (data: CreateCaliberDto, params: RequestParams = {}) =>
      this.request<CaliberDto, any>({
        path: `/api/caliber`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Edition d un  calibre
     *
     * @tags Caliber
     * @name CaliberControllerEdit
     * @summary Edition
     * @request PUT:/api/caliber/{id}
     */
    caliberControllerEdit: (id: number, data: CaliberDto, params: RequestParams = {}) =>
      this.request<CaliberDto, any>({
        path: `/api/caliber/${id}`,
        method: 'PUT',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Soft delete  d un  calibre
     *
     * @tags Caliber
     * @name CaliberControllerDelete
     * @summary Suppression logique
     * @request DELETE:/api/caliber/{id}
     */
    caliberControllerDelete: (id: number, params: RequestParams = {}) =>
      this.request<ApiDeleteResponseDto, any>({
        path: `/api/caliber/${id}`,
        method: 'DELETE',
        format: 'json',
        ...params
      }),

    /**
     * @description Retourne la liste des filletage disponible
     *
     * @tags Threaded-size
     * @name ThreadedSizeControllerFindAllThreadedSize
     * @summary Listes des filletages
     * @request GET:/api/threaded-size
     */
    threadedSizeControllerFindAllThreadedSize: (params: RequestParams = {}) =>
      this.request<ThreadedSizeDto[], any>({
        path: `/api/threaded-size`,
        method: 'GET',
        format: 'json',
        ...params
      }),

    /**
     * @description Ajouter un nouveux type de filetage arme ou rds
     *
     * @tags Threaded-size
     * @name ThreadedSizeControllerCreate
     * @summary Ajout d un filetage
     * @request POST:/api/threaded-size
     */
    threadedSizeControllerCreate: (data: CreateThreadedSizeDto, params: RequestParams = {}) =>
      this.request<ThreadedSizeDto, any>({
        path: `/api/threaded-size`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Edition d une taille de filletage
     *
     * @tags Threaded-size
     * @name ThreadedSizeControllerEdit
     * @summary Edition
     * @request PUT:/api/threaded-size/{id}
     */
    threadedSizeControllerEdit: (id: number, data: ThreadedSizeDto, params: RequestParams = {}) =>
      this.request<ThreadedSizeDto, any>({
        path: `/api/threaded-size/${id}`,
        method: 'PUT',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Soft delete  d un  filletage
     *
     * @tags Threaded-size
     * @name ThreadedSizeControllerDelete
     * @summary Suppression logique
     * @request DELETE:/api/threaded-size/{id}
     */
    threadedSizeControllerDelete: (id: number, params: RequestParams = {}) =>
      this.request<ApiDeleteResponseDto, any>({
        path: `/api/threaded-size/${id}`,
        method: 'DELETE',
        format: 'json',
        ...params
      }),

    /**
     * @description Retourne la liste complete des categories d arme
     *
     * @tags LegislationCategory
     * @name LegislationCategoryControllerFindAll
     * @summary Liste complète
     * @request GET:/api/legislation-category/all
     */
    legislationCategoryControllerFindAll: (params: RequestParams = {}) =>
      this.request<LegislationCategoryDto[], any>({
        path: `/api/legislation-category/all`,
        method: 'GET',
        format: 'json',
        ...params
      }),

    /**
     * @description Retourne la liste des pre-requis necesssaire a la creation d une arme
     *
     * @tags Weapon
     * @name WeaponControllerFindPrerequisitesWeaponList
     * @summary Liste des pre-requis
     * @request GET:/api/weapon/prerequisites
     */
    weaponControllerFindPrerequisitesWeaponList: (params: RequestParams = {}) =>
      this.request<ListOfPrerequisitesWeaponDto, any>({
        path: `/api/weapon/prerequisites`,
        method: 'GET',
        format: 'json',
        ...params
      }),

    /**
     * @description Retourne la liste des diffents type d armes possible
     *
     * @tags Weapon type
     * @name WeaponTypeControllerFindAllWeaponTypes
     * @summary Liste complete
     * @request GET:/api/weapon-type/all
     */
    weaponTypeControllerFindAllWeaponTypes: (params: RequestParams = {}) =>
      this.request<WeaponTypeDto[], any>({
        path: `/api/weapon-type/all`,
        method: 'GET',
        format: 'json',
        ...params
      }),

    /**
     * @description Retourne la liste des pre-requis necesssaire a la creation d un type d arme
     *
     * @tags Weapon type
     * @name WeaponTypeControllerFindPrerequisitesWeaponTypeList
     * @summary Liste des pre-requis
     * @request GET:/api/weapon-type/prerequisites
     */
    weaponTypeControllerFindPrerequisitesWeaponTypeList: (params: RequestParams = {}) =>
      this.request<ListOfPrerequisitesWeaponTypeDto, any>({
        path: `/api/weapon-type/prerequisites`,
        method: 'GET',
        format: 'json',
        ...params
      }),

    /**
     * @description Ajout d un nouveau type d arme en bdd
     *
     * @tags Weapon type
     * @name WeaponTypeControllerCreate
     * @summary Ajout d un type d arme
     * @request POST:/api/weapon-type
     */
    weaponTypeControllerCreate: (data: CreateWeaponTypeDto, params: RequestParams = {}) =>
      this.request<WeaponTypeDto, any>({
        path: `/api/weapon-type`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Edition d un type d arme
     *
     * @tags Weapon type
     * @name WeaponTypeControllerEdit
     * @summary Edition
     * @request PUT:/api/weapon-type/{id}
     */
    weaponTypeControllerEdit: (id: number, data: UpdateWeaponTypeDto, params: RequestParams = {}) =>
      this.request<WeaponTypeDto, any>({
        path: `/api/weapon-type/${id}`,
        method: 'PUT',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Suppression logique d un type d arme
     *
     * @tags Weapon type
     * @name WeaponTypeControllerDelete
     * @summary Suppression logique
     * @request DELETE:/api/weapon-type/{id}
     */
    weaponTypeControllerDelete: (id: number, params: RequestParams = {}) =>
      this.request<ApiDeleteResponseDto, any>({
        path: `/api/weapon-type/${id}`,
        method: 'DELETE',
        format: 'json',
        ...params
      }),

    /**
     * @description Retourne la liste de tous les chargeurs disponible
     *
     * @tags Magazine
     * @name MagazineControllerFindAll
     * @summary Liste complète
     * @request GET:/api/magazine/all
     */
    magazineControllerFindAll: (params: RequestParams = {}) =>
      this.request<WeaponMagazineDto[], any>({
        path: `/api/magazine/all`,
        method: 'GET',
        format: 'json',
        ...params
      }),

    /**
     * @description Retourne le detail du chargeur
     *
     * @tags Magazine
     * @name MagazineControllerFindById
     * @summary Filtré par id
     * @request GET:/api/magazine/by/id/{id}
     */
    magazineControllerFindById: (id: number, params: RequestParams = {}) =>
      this.request<WeaponMagazineDto, any>({
        path: `/api/magazine/by/id/${id}`,
        method: 'GET',
        format: 'json',
        ...params
      }),

    /**
     * @description Retourne les chargeurs filtres par marque
     *
     * @tags Magazine
     * @name MagazineControllerFindByFactory
     * @summary Filtré par maruqe
     * @request GET:/api/magazine/by/factory/{factoryId}
     */
    magazineControllerFindByFactory: (factoryId: number, params: RequestParams = {}) =>
      this.request<WeaponMagazineDto[], any>({
        path: `/api/magazine/by/factory/${factoryId}`,
        method: 'GET',
        format: 'json',
        ...params
      }),

    /**
     * @description Retourne la liste des pre requis de creation d un nouveau chargeur
     *
     * @tags Magazine
     * @name MagazineControllerFindPrerequisitesWeaponMagazineList
     * @summary Liste des prerequis
     * @request GET:/api/magazine/prerequisites
     */
    magazineControllerFindPrerequisitesWeaponMagazineList: (params: RequestParams = {}) =>
      this.request<ListOfPrerequisitesWeaponMagazineDto, any>({
        path: `/api/magazine/prerequisites`,
        method: 'GET',
        format: 'json',
        ...params
      }),

    /**
     * @description Ajoute un nouveau chargeur en bdd et le retoune
     *
     * @tags Magazine
     * @name MagazineControllerCreate
     * @summary Ajout de chargeur
     * @request POST:/api/magazine
     */
    magazineControllerCreate: (data: CreateWeaponMagazineDto, params: RequestParams = {}) =>
      this.request<WeaponMagazineDto, any>({
        path: `/api/magazine`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Edition d un chargeur
     *
     * @tags Magazine
     * @name MagazineControllerEdit
     * @summary Edition
     * @request PUT:/api/magazine/{id}
     */
    magazineControllerEdit: (
      id: number,
      data: UpdateWeaponMagazineDto,
      params: RequestParams = {}
    ) =>
      this.request<WeaponMagazineDto, any>({
        path: `/api/magazine/${id}`,
        method: 'PUT',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Suppression logique  d un chargeur
     *
     * @tags Magazine
     * @name MagazineControllerDelete
     * @summary Suppression logique
     * @request DELETE:/api/magazine/{id}
     */
    magazineControllerDelete: (id: number, params: RequestParams = {}) =>
      this.request<ApiDeleteResponseDto, any>({
        path: `/api/magazine/${id}`,
        method: 'DELETE',
        format: 'json',
        ...params
      }),

    /**
     * @description Retourne la liste de tous les reducteur de son disponible
     *
     * @tags Sound-reducer
     * @name SoundReducerControllerFindAll
     * @summary Liste des RDS
     * @request GET:/api/sound-reducer/all
     */
    soundReducerControllerFindAll: (params: RequestParams = {}) =>
      this.request<SoundNoiseReducerDto[], any>({
        path: `/api/sound-reducer/all`,
        method: 'GET',
        format: 'json',
        ...params
      }),

    /**
     * @description Retourne le detail du rds selectionner avec son id
     *
     * @tags Sound-reducer
     * @name SoundReducerControllerFindById
     * @summary Par id
     * @request GET:/api/sound-reducer/by/{id}
     */
    soundReducerControllerFindById: (id: number, params: RequestParams = {}) =>
      this.request<SoundNoiseReducerDto, any>({
        path: `/api/sound-reducer/by/${id}`,
        method: 'GET',
        format: 'json',
        ...params
      }),

    /**
     * @description Retourne la liste des pre requis pour la creation d un nouveau rds
     *
     * @tags Sound-reducer
     * @name SoundReducerControllerFindPrerequisitesSoundReducerList
     * @summary Liste des prerequis
     * @request GET:/api/sound-reducer/prerequisites
     */
    soundReducerControllerFindPrerequisitesSoundReducerList: (params: RequestParams = {}) =>
      this.request<ListOfPrerequisitesSoundNoiseReducerDto, any>({
        path: `/api/sound-reducer/prerequisites`,
        method: 'GET',
        format: 'json',
        ...params
      }),

    /**
     * @description Ajout d un nouveau reducteur de son en base de donnee
     *
     * @tags Sound-reducer
     * @name SoundReducerControllerCreate
     * @summary Ajout d un RDS
     * @request POST:/api/sound-reducer
     */
    soundReducerControllerCreate: (data: CreateSoundNoiseReducerDto, params: RequestParams = {}) =>
      this.request<SoundNoiseReducerDto, any>({
        path: `/api/sound-reducer`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Edition d un reducteur de son
     *
     * @tags Sound-reducer
     * @name SoundReducerControllerEdit
     * @summary Edition
     * @request PUT:/api/sound-reducer/{id}
     */
    soundReducerControllerEdit: (
      id: number,
      data: UpdateSoundNoiseReducerDto,
      params: RequestParams = {}
    ) =>
      this.request<SoundNoiseReducerDto, any>({
        path: `/api/sound-reducer/${id}`,
        method: 'PUT',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Suppression logique d un reducteur de son
     *
     * @tags Sound-reducer
     * @name SoundReducerControllerDelete
     * @summary Suppression logique
     * @request DELETE:/api/sound-reducer/{id}
     */
    soundReducerControllerDelete: (id: number, params: RequestParams = {}) =>
      this.request<ApiDeleteResponseDto, any>({
        path: `/api/sound-reducer/${id}`,
        method: 'DELETE',
        format: 'json',
        ...params
      }),

    /**
     * @description Retourne la liste des arme de poings
     *
     * @tags Hand-Gun
     * @name HandGunControllerFindAll
     * @summary Liste complète
     * @request GET:/api/hand-gun/all
     */
    handGunControllerFindAll: (params: RequestParams = {}) =>
      this.request<HandGunDto[], any>({
        path: `/api/hand-gun/all`,
        method: 'GET',
        format: 'json',
        ...params
      }),

    /**
     * @description Retourne l arme de poing trouver par son id
     *
     * @tags Hand-Gun
     * @name HandGunControllerFindById
     * @summary Filtré par id
     * @request GET:/api/hand-gun/by/id/{id}
     */
    handGunControllerFindById: (id: number, params: RequestParams = {}) =>
      this.request<HandGunDto, any>({
        path: `/api/hand-gun/by/id/${id}`,
        method: 'GET',
        format: 'json',
        ...params
      }),

    /**
     * @description Retourne la liste des arme de poings filtree par categories
     *
     * @tags Hand-Gun
     * @name HandGunControllerFindAllByCategory
     * @summary Filtré par categorie
     * @request GET:/api/hand-gun/by/category/{categoryId}
     */
    handGunControllerFindAllByCategory: (categoryId: number, params: RequestParams = {}) =>
      this.request<HandGunDto[], any>({
        path: `/api/hand-gun/by/category/${categoryId}`,
        method: 'GET',
        format: 'json',
        ...params
      }),

    /**
     * @description Ajout d une nouvelle arme de poing
     *
     * @tags Hand-Gun
     * @name HandGunControllerCreate
     * @summary Creation
     * @request POST:/api/hand-gun
     */
    handGunControllerCreate: (data: CreateHandGunDto, params: RequestParams = {}) =>
      this.request<HandGunDto, any>({
        path: `/api/hand-gun`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Edition d une arme de poing
     *
     * @tags Hand-Gun
     * @name HandGunControllerUpdate
     * @summary Edition
     * @request PUT:/api/hand-gun/{id}
     */
    handGunControllerUpdate: (id: number, data: UpdateHandGunDto, params: RequestParams = {}) =>
      this.request<HandGunDto, any>({
        path: `/api/hand-gun/${id}`,
        method: 'PUT',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Suppresion logique de l arme de poing
     *
     * @tags Hand-Gun
     * @name HandGunControllerDelete
     * @summary Suppresion logique
     * @request DELETE:/api/hand-gun/{id}
     */
    handGunControllerDelete: (id: number, params: RequestParams = {}) =>
      this.request<ApiDeleteResponseDto, any>({
        path: `/api/hand-gun/${id}`,
        method: 'DELETE',
        format: 'json',
        ...params
      }),

    /**
     * @description Retourne la liste des armes longues
     *
     * @tags Riffle
     * @name RiffleControllerFindAll
     * @summary Liste complète
     * @request GET:/api/riffle/all
     */
    riffleControllerFindAll: (params: RequestParams = {}) =>
      this.request<RiffleDto[], any>({
        path: `/api/riffle/all`,
        method: 'GET',
        format: 'json',
        ...params
      }),

    /**
     * @description Retourne l arme longue trouver par son id
     *
     * @tags Riffle
     * @name RiffleControllerFindById
     * @summary Filtré par id
     * @request GET:/api/riffle/by/id/{id}
     */
    riffleControllerFindById: (id: number, params: RequestParams = {}) =>
      this.request<RiffleDto, any>({
        path: `/api/riffle/by/id/${id}`,
        method: 'GET',
        format: 'json',
        ...params
      }),

    /**
     * @description Retourne la liste des arme de poings filtree par categories
     *
     * @tags Riffle
     * @name RiffleControllerFindAllByCategory
     * @summary Filtré par categorie
     * @request GET:/api/riffle/by/category/{categoryId}
     */
    riffleControllerFindAllByCategory: (categoryId: number, params: RequestParams = {}) =>
      this.request<RiffleDto[], any>({
        path: `/api/riffle/by/category/${categoryId}`,
        method: 'GET',
        format: 'json',
        ...params
      }),

    /**
     * @description Ajout d une nouvelle arme longue
     *
     * @tags Riffle
     * @name RiffleControllerCreate
     * @summary Creation
     * @request POST:/api/riffle
     */
    riffleControllerCreate: (data: CreateRiffleDto, params: RequestParams = {}) =>
      this.request<RiffleDto, any>({
        path: `/api/riffle`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Edition d une arme longue
     *
     * @tags Riffle
     * @name RiffleControllerUpdate
     * @summary Edition
     * @request PUT:/api/riffle/{id}
     */
    riffleControllerUpdate: (id: number, data: UpdateRiffleDto, params: RequestParams = {}) =>
      this.request<RiffleDto, any>({
        path: `/api/riffle/${id}`,
        method: 'PUT',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Suppresion logique de l arme longue
     *
     * @tags Riffle
     * @name RiffleControllerDelete
     * @summary Suppresion logique
     * @request DELETE:/api/riffle/{id}
     */
    riffleControllerDelete: (id: number, params: RequestParams = {}) =>
      this.request<ApiDeleteResponseDto, any>({
        path: `/api/riffle/${id}`,
        method: 'DELETE',
        format: 'json',
        ...params
      }),

    /**
     * @description Retourne la liste des munitions filtre par calibre
     *
     * @tags Ammunition
     * @name AmmunitionControllerFindByCaliber
     * @summary Filtre par calibre
     * @request GET:/api/ammunition/by/caliber/{id}
     */
    ammunitionControllerFindByCaliber: (caliberId: number, id: any, params: RequestParams = {}) =>
      this.request<AmmunitionDto[], any>({
        path: `/api/ammunition/by/caliber/${id}`,
        method: 'GET',
        format: 'json',
        ...params
      }),

    /**
     * @description Retourne la liste des munitions filtre par calibre
     *
     * @tags Ammunition
     * @name AmmunitionControllerFindByCategory
     * @summary Filtre par calibre
     * @request GET:/api/ammunition/by/category/{categoryId}
     */
    ammunitionControllerFindByCategory: (categoryId: number, params: RequestParams = {}) =>
      this.request<AmmunitionDto[], any>({
        path: `/api/ammunition/by/category/${categoryId}`,
        method: 'GET',
        format: 'json',
        ...params
      }),

    /**
     * @description Retourne la liste des pre-requis necesssaire a la creation d une nouvelle munition
     *
     * @tags Ammunition
     * @name AmmunitionControllerFindPrerequisitesAmmunitionList
     * @summary Liste des pre-requis
     * @request GET:/api/ammunition/prerequisites
     */
    ammunitionControllerFindPrerequisitesAmmunitionList: (params: RequestParams = {}) =>
      this.request<ListOfPrerequisitesAmmunitionDto, any>({
        path: `/api/ammunition/prerequisites`,
        method: 'GET',
        format: 'json',
        ...params
      }),

    /**
     * @description Creation d une nouvelle munition en base de donnée
     *
     * @tags Ammunition
     * @name AmmunitionControllerCreate
     * @summary Ajout
     * @request POST:/api/ammunition
     */
    ammunitionControllerCreate: (data: CreateAmmunitionDto, params: RequestParams = {}) =>
      this.request<AmmunitionDto, any>({
        path: `/api/ammunition`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Edition d une  munition en base de donnée
     *
     * @tags Ammunition
     * @name AmmunitionControllerEdit
     * @summary Edition
     * @request PUT:/api/ammunition/{id}
     */
    ammunitionControllerEdit: (id: number, data: UpdateAmmunitionDto, params: RequestParams = {}) =>
      this.request<AmmunitionDto, any>({
        path: `/api/ammunition/${id}`,
        method: 'PUT',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Suppression logique d une  munition en base de donnée
     *
     * @tags Ammunition
     * @name AmmunitionControllerDelete
     * @summary Suppression logique
     * @request DELETE:/api/ammunition/{id}
     */
    ammunitionControllerDelete: (id: number, params: RequestParams = {}) =>
      this.request<ApiDeleteResponseDto, any>({
        path: `/api/ammunition/${id}`,
        method: 'DELETE',
        format: 'json',
        ...params
      }),

    /**
     * @description Retourne la liste de toutes les oviges disponible
     *
     * @tags AmmunitionHeadType
     * @name AmmunitionHeadTypeControllerFindAllHeadTypes
     * @summary Toutes les oviges
     * @request GET:/api/ammunition-head-type
     */
    ammunitionHeadTypeControllerFindAllHeadTypes: (params: RequestParams = {}) =>
      this.request<AmmunitionHeadTypeDto[], any>({
        path: `/api/ammunition-head-type`,
        method: 'GET',
        format: 'json',
        ...params
      }),

    /**
     * @description Creattion d un nouveau type d ogive pour les munitions
     *
     * @tags AmmunitionHeadType
     * @name AmmunitionHeadTypeControllerCreate
     * @summary Ajout d une ovige
     * @request POST:/api/ammunition-head-type
     */
    ammunitionHeadTypeControllerCreate: (
      data: CreateAmmunitionHeadTypeDto,
      params: RequestParams = {}
    ) =>
      this.request<AmmunitionHeadTypeDto, any>({
        path: `/api/ammunition-head-type`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Edition d un  type d ovige
     *
     * @tags AmmunitionHeadType
     * @name AmmunitionHeadTypeControllerEdit
     * @summary Edition
     * @request PUT:/api/ammunition-head-type/{id}
     */
    ammunitionHeadTypeControllerEdit: (
      id: number,
      data: AmmunitionHeadTypeDto,
      params: RequestParams = {}
    ) =>
      this.request<AmmunitionHeadTypeDto, any>({
        path: `/api/ammunition-head-type/${id}`,
        method: 'PUT',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Suppression logique d une ovige
     *
     * @tags AmmunitionHeadType
     * @name AmmunitionHeadTypeControllerDelete
     * @summary Suppression logique
     * @request DELETE:/api/ammunition-head-type/{id}
     */
    ammunitionHeadTypeControllerDelete: (id: number, params: RequestParams = {}) =>
      this.request<ApiDeleteResponseDto, any>({
        path: `/api/ammunition-head-type/${id}`,
        method: 'DELETE',
        format: 'json',
        ...params
      }),

    /**
     * @description Retourne la liste de toutes les douilles disponible
     *
     * @tags AmmunitionBodyType
     * @name AmmunitionBodyTypeControllerFindAllBodyTypes
     * @summary Toutes les douilles
     * @request GET:/api/ammunition-body-type
     */
    ammunitionBodyTypeControllerFindAllBodyTypes: (params: RequestParams = {}) =>
      this.request<AmmunitionBodyTypeDto[], any>({
        path: `/api/ammunition-body-type`,
        method: 'GET',
        format: 'json',
        ...params
      }),

    /**
     * @description Creattion d un nouveau type de douille pour les munitions
     *
     * @tags AmmunitionBodyType
     * @name AmmunitionBodyTypeControllerCreate
     * @summary Ajout
     * @request POST:/api/ammunition-body-type
     */
    ammunitionBodyTypeControllerCreate: (
      data: CreateAmmunitionBodyTypeDto,
      params: RequestParams = {}
    ) =>
      this.request<AmmunitionBodyTypeDto, any>({
        path: `/api/ammunition-body-type`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Editio d un  type de douille pour les munitions
     *
     * @tags AmmunitionBodyType
     * @name AmmunitionBodyTypeControllerEdit
     * @summary Editio
     * @request PUT:/api/ammunition-body-type/{id}
     */
    ammunitionBodyTypeControllerEdit: (
      id: number,
      data: AmmunitionBodyTypeDto,
      params: RequestParams = {}
    ) =>
      this.request<AmmunitionBodyTypeDto, any>({
        path: `/api/ammunition-body-type/${id}`,
        method: 'PUT',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Suppression logique d une douille
     *
     * @tags AmmunitionBodyType
     * @name AmmunitionBodyTypeControllerDelete
     * @summary Suppression logique
     * @request DELETE:/api/ammunition-body-type/{id}
     */
    ammunitionBodyTypeControllerDelete: (id: number, params: RequestParams = {}) =>
      this.request<ApiDeleteResponseDto, any>({
        path: `/api/ammunition-body-type/${id}`,
        method: 'DELETE',
        format: 'json',
        ...params
      }),

    /**
     * @description Point d entree pour creer un nouveau compte utilisateur (Client part defaut)
     *
     * @tags Users
     * @name UserControllerRegister
     * @summary Creation de compte
     * @request POST:/api/user
     */
    userControllerRegister: (data: CreateUserDto, params: RequestParams = {}) =>
      this.request<UserDto, any>({
        path: `/api/user`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Connexion a l'application
     *
     * @tags Authentication
     * @name AuthControllerLogin
     * @summary Login
     * @request POST:/api/auth/login
     */
    authControllerLogin: (data: UserCredentialDto, params: RequestParams = {}) =>
      this.request<TokenDto, void>({
        path: `/api/auth/login`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Autentification du token et retour du profil
     *
     * @tags Authentication
     * @name AuthControllerMe
     * @summary Profil par token
     * @request GET:/api/auth/me
     * @secure
     */
    authControllerMe: (params: RequestParams = {}) =>
      this.request<UserDto, any>({
        path: `/api/auth/me`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Retourne la liste completes des optiques
     *
     * @tags Optic
     * @name OpticControllerFindAllOptics
     * @summary Liste complete
     * @request GET:/api/optic/all
     */
    opticControllerFindAllOptics: (params: RequestParams = {}) =>
      this.request<OpticDto[], any>({
        path: `/api/optic/all`,
        method: 'GET',
        format: 'json',
        ...params
      }),

    /**
     * @description Retourne le detail de l optique
     *
     * @tags Optic
     * @name OpticControllerFindById
     * @summary Par id
     * @request GET:/api/optic/by/{id}
     */
    opticControllerFindById: (id: number, params: RequestParams = {}) =>
      this.request<OpticDto, any>({
        path: `/api/optic/by/${id}`,
        method: 'GET',
        format: 'json',
        ...params
      }),

    /**
     * @description Retourne la liste des pre-requis necesssaire a la creation d une optique
     *
     * @tags Optic
     * @name OpticControllerFindPrerequisitesOpticList
     * @summary Liste des pre-requis
     * @request GET:/api/optic/prerequisites
     */
    opticControllerFindPrerequisitesOpticList: (params: RequestParams = {}) =>
      this.request<ListOfPrerequisitesOpticDto, any>({
        path: `/api/optic/prerequisites`,
        method: 'GET',
        format: 'json',
        ...params
      }),

    /**
     * @description Creer une nouvelle optique et retourne son dto en reponse
     *
     * @tags Optic
     * @name OpticControllerCreate
     * @summary Creation d une nouvelle optique
     * @request POST:/api/optic
     */
    opticControllerCreate: (data: CreateOpticDto, params: RequestParams = {}) =>
      this.request<OpticDto, any>({
        path: `/api/optic`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Edition de l optique
     *
     * @tags Optic
     * @name OpticControllerEdit
     * @summary Edition
     * @request PUT:/api/optic/{id}
     */
    opticControllerEdit: (id: number, data: UpdateOpticDto, params: RequestParams = {}) =>
      this.request<OpticDto, any>({
        path: `/api/optic/${id}`,
        method: 'PUT',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Suppression logique de l optique
     *
     * @tags Optic
     * @name OpticControllerDelete
     * @summary Suppression logique
     * @request DELETE:/api/optic/{id}
     */
    opticControllerDelete: (id: number, params: RequestParams = {}) =>
      this.request<ApiDeleteResponseDto, any>({
        path: `/api/optic/${id}`,
        method: 'DELETE',
        format: 'json',
        ...params
      }),

    /**
     * @description Retourne la liste complete des types d optique
     *
     * @tags OpticType
     * @name OpticTypeControllerFindAll
     * @summary Liste complete
     * @request GET:/api/optic-type
     */
    opticTypeControllerFindAll: (params: RequestParams = {}) =>
      this.request<OpticTypeDto[], any>({
        path: `/api/optic-type`,
        method: 'GET',
        format: 'json',
        ...params
      }),

    /**
     * @description Ajouter un nouveau type d optique
     *
     * @tags OpticType
     * @name OpticTypeControllerCreate
     * @summary Ajout
     * @request POST:/api/optic-type
     */
    opticTypeControllerCreate: (data: CreateOpticTypeDto, params: RequestParams = {}) =>
      this.request<OpticTypeDto, any>({
        path: `/api/optic-type`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Edition un type d optique
     *
     * @tags OpticType
     * @name OpticTypeControllerEdit
     * @summary Edition
     * @request PUT:/api/optic-type/{id}
     */
    opticTypeControllerEdit: (id: number, data: OpticTypeDto, params: RequestParams = {}) =>
      this.request<OpticTypeDto, any>({
        path: `/api/optic-type/${id}`,
        method: 'PUT',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Suppression logique un type d optique
     *
     * @tags OpticType
     * @name OpticTypeControllerDelete
     * @summary Suppression logique
     * @request DELETE:/api/optic-type/{id}
     */
    opticTypeControllerDelete: (id: number, params: RequestParams = {}) =>
      this.request<ApiDeleteResponseDto, any>({
        path: `/api/optic-type/${id}`,
        method: 'DELETE',
        format: 'json',
        ...params
      })
  }
}
