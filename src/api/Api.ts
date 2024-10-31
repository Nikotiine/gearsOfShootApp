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
  ref: string
  type: FactoryTypeDto
  /** @example "Colt" */
  name: string
}

export interface CreateFactoryDto {
  /** @example "Colt" */
  name: string
  typeId: number
  /** @example "Une description de la marque et ses produits" */
  description: string
  ref: string
}

export interface ListOfPrerequisitesFactoryDto {
  types: FactoryTypeDto[]
}

export interface CreateCaliberDto {
  /** @example "17 HMR" */
  name: string
  ref: string
}

export interface CaliberDto {
  /** @example "17 HMR" */
  name: string
  ref: string
  id: number
}

export interface ThreadedSizeDto {
  /** @example "1/2 x 28" */
  size: string
  ref: string
  id: number
}

export interface CreateThreadedSizeDto {
  /** @example "1/2 x 28" */
  size: string
  ref: string
}

export interface CreateWeaponDto {
  /** @example "CZ 457" */
  name: string
  /** @example "Une description de l arme son histoire ..." */
  description: string | null
  /** @example "Varmint ou Luxe" */
  variation: string | null
  /** @example "C" */
  category: CreateWeaponDtoCategoryEnum
  caliberId: number
  factoryId: number
  typeId: number
  /** @example 51 */
  barrelLength: number
  /** @example true */
  isOpticReady: boolean
  /** @example false */
  isAdjustableTrigger: boolean
  /** @example false */
  isThreadedBarrel: boolean
  /** @example "Lourd" */
  barrelType: CreateWeaponDtoBarrelTypeEnum
  threadedSizeId: number | null
  adjustableTriggerValue: string | null
}

export interface WeaponTypeDto {
  /** @example "Fusil a verrou" */
  name: string
  mode: WeaponTypeDtoModeEnum
  ref: string
  id: number
}

export interface WeaponDto {
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
  category: WeaponDtoCategoryEnum
  caliber: CaliberDto
  factory: FactoryDto
  type: WeaponTypeDto
  /** @example 51 */
  barrelLength: number
  /** @example true */
  isOpticReady: boolean
  /** @example false */
  isAdjustableTrigger: boolean
  /** @example false */
  isThreadedBarrel: boolean
  /** @example "Lourd" */
  barrelType: WeaponDtoBarrelTypeEnum
  threadedSize: ThreadedSizeDto
  adjustableTriggerValue: string
}

export interface ListOfPrerequisitesWeaponDto {
  calibers: CaliberDto[]
  factories: FactoryDto[]
  types: WeaponTypeDto[]
  threadedSizes: ThreadedSizeDto[]
}

export interface CreateWeaponTypeDto {
  /** @example "Fusil a verrou" */
  name: string
  mode: CreateWeaponTypeDtoModeEnum
  ref: string
}

export interface CreateAmmunitionDto {
  /** @example "Sk Standard" */
  name: string
  /** @example "Une description de la munition, qualite / origine / conseil d utilisation" */
  description: string | null
  /** @example "C" */
  category: CreateAmmunitionDtoCategoryEnum
  /** @example 320 */
  initialSpeed: number
  /** @example "Centrale" */
  percussionType: CreateAmmunitionDtoPercussionTypeEnum
  /** @example 50 */
  packaging: number
  headTypeId: number
  bodyTypeId: number
  factoryId: number
  caliberId: number
}

export interface AmmunitionHeadTypeDto {
  /** @example "Full metal jacket" */
  name: string
  ref: string
  id: number
}

export interface AmmunitionBodyTypeDto {
  /** @example "Laiton" */
  name: string
  ref: string
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
  category: AmmunitionDtoCategoryEnum
  /** @example 320 */
  initialSpeed: number
  /** @example "Centrale" */
  percussionType: AmmunitionDtoPercussionTypeEnum
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
}

export interface CreateAmmunitionHeadTypeDto {
  /** @example "Full metal jacket" */
  name: string
  ref: string
}

export interface CreateAmmunitionBodyTypeDto {
  /** @example "Laiton" */
  name: string
  ref: string
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

/** @example "C" */
export enum CreateWeaponDtoCategoryEnum {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D'
}

/** @example "Lourd" */
export enum CreateWeaponDtoBarrelTypeEnum {
  Normal = 'Normal',
  SemiLourd = 'Semi lourd',
  Lourd = 'Lourd'
}

export enum WeaponTypeDtoModeEnum {
  CoupParCoup = 'Coup par coup',
  SemiAuto = 'Semi-Auto',
  Automatique = 'Automatique'
}

/** @example "C" */
export enum WeaponDtoCategoryEnum {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D'
}

/** @example "Lourd" */
export enum WeaponDtoBarrelTypeEnum {
  Normal = 'Normal',
  SemiLourd = 'Semi lourd',
  Lourd = 'Lourd'
}

export enum CreateWeaponTypeDtoModeEnum {
  CoupParCoup = 'Coup par coup',
  SemiAuto = 'Semi-Auto',
  Automatique = 'Automatique'
}

/** @example "C" */
export enum CreateAmmunitionDtoCategoryEnum {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D'
}

/** @example "Centrale" */
export enum CreateAmmunitionDtoPercussionTypeEnum {
  Centrale = 'Centrale',
  Annulaire = 'Annulaire'
}

/** @example "C" */
export enum AmmunitionDtoCategoryEnum {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D'
}

/** @example "Centrale" */
export enum AmmunitionDtoPercussionTypeEnum {
  Centrale = 'Centrale',
  Annulaire = 'Annulaire'
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
     * @description Retourne toutes les marques sans distinction
     *
     * @tags Factory
     * @name FactoryControllerFindAll
     * @summary Get all factories
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
     * @description Retourne toutes les marques suivant leur type
     *
     * @tags Factory
     * @name FactoryControllerFindByType
     * @summary Get all factories by type
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
     * @description Ajout d une nouvelle marque pour un type FactoryType
     *
     * @tags Factory
     * @name FactoryControllerCreate
     * @summary Ajout d une marque
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
     * @description Retourne la liste des pre-requis necesssaire a la creation d une marque
     *
     * @tags Factory
     * @name FactoryControllerFindPrerequisitesFactoryList
     * @summary Liste des pre-requis
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
     * @description Ajout d un nouveau calibre en base de donnee
     *
     * @tags Caliber
     * @name CaliberControllerCreate
     * @summary Ajout d un calibre
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
     * @description Retourne la liste de tous les calibres disponible
     *
     * @tags Caliber
     * @name CaliberControllerFindAllCalibers
     * @summary Liste des calibres
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
     * @description Ajoute une nouvelle arme en base de donnee
     *
     * @tags Weapon
     * @name WeaponControllerCreate
     * @summary Ajour d une arme
     * @request POST:/api/weapon
     */
    weaponControllerCreate: (data: CreateWeaponDto, params: RequestParams = {}) =>
      this.request<WeaponDto, any>({
        path: `/api/weapon`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
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
     * @description Retourne la liste des references d arme enregister en bdd
     *
     * @tags Weapon
     * @name WeaponControllerFindAllByCategory
     * @summary Armes par categorie
     * @request GET:/api/weapon/by/{category}
     */
    weaponControllerFindAllByCategory: (category: string, params: RequestParams = {}) =>
      this.request<WeaponDto[], any>({
        path: `/api/weapon/by/${category}`,
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
     * @description Retourne la liste des diffents type d arme possible
     *
     * @tags Weapon type
     * @name WeaponTypeControllerFindAllWeaponTypes
     * @summary Liste des types d arme
     * @request GET:/api/weapon-type
     */
    weaponTypeControllerFindAllWeaponTypes: (params: RequestParams = {}) =>
      this.request<WeaponTypeDto[], any>({
        path: `/api/weapon-type`,
        method: 'GET',
        format: 'json',
        ...params
      }),

    /**
     * @description Creation d une nouvelle munition en base de donnée
     *
     * @tags Ammunition
     * @name AmmunitionControllerCreate
     * @summary Ajouter une munition
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
     * @request GET:/api/ammunition/by/category/{category}
     */
    ammunitionControllerFindByCategory: (category: string, params: RequestParams = {}) =>
      this.request<AmmunitionDto[], any>({
        path: `/api/ammunition/by/category/${category}`,
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
     * @description Creattion d un nouveau type de douille pour les munitions
     *
     * @tags AmmunitionBodyType
     * @name AmmunitionBodyTypeControllerCreate
     * @summary Ajout d un type de douille
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
      })
  }
}
