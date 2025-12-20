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

export interface FactoryFilter {
  /**
   * Nombre maximum de résultats à renvoyer
   * @example 10
   */
  limit?: number
  /**
   * Décalage pour la pagination
   * @example 0
   */
  offset?: number
  /** @example "Reference interne de l objet" */
  reference?: string
  /** @example "Libelle de la marque" */
  name?: string
  /** @example "Le type" */
  type?: string
}

export interface PaginatedResponseDto {
  /** Résultats paginés */
  data: any[][]
  /**
   * Nombre total d’éléments disponibles
   * @example 42
   */
  total: number
  /**
   * Nombre maximum de résultats renvoyés
   * @example 10
   */
  limit: number
  /**
   * Décalage utilisé pour la pagination
   * @example 0
   */
  offset: number
}

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

export interface CreateFactoryDto {
  /** @example "Colt" */
  name: string
  type: FactoryTypeDto
  /** @example "Une description de la marque et ses produits" */
  description: string
}

export interface UpdateFactoryDto {
  /** @example "Colt" */
  name: string
  type: FactoryTypeDto
  /** @example "Une description de la marque et ses produits" */
  description: string
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

export interface ColorDto {
  name: string
  reference: string
  id: number
}

export interface CreateColorDto {
  name: string
  reference: string
}

export interface MaterialDto {
  name: string
  reference: string
  id: number
}

export interface CreateMaterialDto {
  name: string
  reference: string
}

export interface RailSizeDto {
  id: number
  name: string
  reference: string
}

export interface OpticReadyPlateDto {
  name: string
  description: string
  reference: string
  id: number
}

export interface CreateOpticReadyPlateDto {
  name: string
  description: string
  reference: string
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
  type: WeaponTypeDtoTypeEnum
}

export interface ListOfPrerequisitesWeaponTypeDto {
  modes: WeaponReloadModeDto[]
}

export interface CreateWeaponTypeDto {
  /** @example "Fusil a verrou titi" */
  name: string
  modeId: number
  reference: string
  /** @example "handgun ou riffle" */
  type: string | null
}

export interface UpdateWeaponTypeDto {
  /** @example "Fusil a verrou titi" */
  name: string
  modeId: number
  reference: string
  /** @example "handgun ou riffle" */
  type: string | null
  id: number
}

export interface MagazineFilter {
  /**
   * Nombre maximum de résultats à renvoyer
   * @example 10
   */
  limit?: number
  /**
   * Décalage pour la pagination
   * @example 0
   */
  offset?: number
  /** @example "Reference interne de l objet" */
  reference?: string
  /** @example "Nom du chargeur" */
  name?: string
  /** @example "La marque" */
  factory?: string
  /** @example "La categorie de lu chargeur" */
  category?: string
  /** @example "Le calibre" */
  caliber?: string
  /** @example "La capacite" */
  capacity?: number | null
}

export interface WeaponBarrelTypeDto {
  id: number
  name: string
}

export interface PercussionTypeDto {
  id: number
  name: string
}

export interface MLockOptionDto {
  name: string
  id: number
}

export interface SupplierDto {
  name: string
  address: string
  phoneNumber: string
  city: string
  country: string
  zipCode: string
  siret: string
  id: number
}

export interface CreatePriceHistoryDto {
  supplierPrice: number
  recommendedSalePrice: number
  currentSalePrice: number
  supplier: SupplierDto
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

export interface StockHistoriesDto {
  id: number
  movementQuantity: number
  previousQuantity: number
  newQuantity: number
  /** @format date-time */
  createdAt: string
  movement: string
  reason: string | null
  createdBy: UserDto
}

export interface StockDto {
  id: number
  quantity: number
  /** @format date-time */
  createdAt: string
  /** @format date-time */
  updatedAt: string
  histories: StockHistoriesDto[]
}

export interface RiffleDto {
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
  category: LegislationCategoryDto
  /** Le calibre de l arme */
  caliber: CaliberDto
  /** la marque */
  factory: FactoryDto
  /**
   * Type d arme
   * @example "Fusil a verrou"
   */
  type: WeaponTypeDto
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
  barrelType: WeaponBarrelTypeDto
  /** Les dimmension du filletage */
  threadedSize: ThreadedSizeDto | null
  /**
   * les valeurs de poids depart de la detente
   * @example "Entre 1 et 2kg"
   */
  adjustableTriggerMinWeight: number | null
  /**
   * les valeurs de poids depart de la detente
   * @example "Entre 1 et 2kg"
   */
  adjustableTriggerMaxWeight: number | null
  /** Le type de percussion ( annulaire ou centrale ) */
  percussionType: PercussionTypeDto
  /**
   * Le nombre de chargeur fournis
   * @example 1
   */
  providedMagazineQuantity: number
  /**
   * L'epaisseur exterieur du canon
   * @example 18
   */
  barrelSize: number
  /** La matiere de la crosse ou caracasse */
  buttMaterial: MaterialDto | null
  /** Guidon reglable */
  isAdjustableFrontSight: boolean
  /** Hausse reglable */
  isAdjustableBackSight: boolean
  /** la couleur de la crosse */
  buttColor: ColorDto | null
  /** la couleur du canon  */
  barrelColor: ColorDto | null
  /** Crosse ajustable en profondeur */
  isAdjustableButt: boolean
  /** Busc adjutable */
  isAdjustableBusk: boolean
  railSize: RailSizeDto | null
  /** Grenadiere */
  grenadierSlot: number
  /** Port QC */
  qcSlot: number
  /** Rail Mlock */
  isMlockCompatibility: boolean
  /** Visee ouverte ? */
  isOpenAim: boolean
  mLockOptions: MLockOptionDto[] | null
  priceHistory: CreatePriceHistoryDto
  inStock: number
  id: number
  /** @example "CZ-457-VAR-22LR" */
  reference: string
  stock: StockDto | null
  createdBy: UserDto
  updatedBy: UserDto
  /** @format date-time */
  createdAt: string
  /** @format date-time */
  updatedAt: string
}

export interface WeaponTriggerTypeDto {
  id: number
  name: string
  reference: string
}

export interface HandGunDto {
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
  category: LegislationCategoryDto
  /** Le calibre de l arme */
  caliber: CaliberDto
  /** la marque */
  factory: FactoryDto
  /**
   * Type d arme
   * @example "Fusil a verrou"
   */
  type: WeaponTypeDto
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
  barrelType: WeaponBarrelTypeDto
  /** Les dimmension du filletage */
  threadedSize: ThreadedSizeDto | null
  /**
   * les valeurs de poids depart de la detente
   * @example "Entre 1 et 2kg"
   */
  adjustableTriggerMinWeight: number | null
  /**
   * les valeurs de poids depart de la detente
   * @example "Entre 1 et 2kg"
   */
  adjustableTriggerMaxWeight: number | null
  /** Le type de percussion ( annulaire ou centrale ) */
  percussionType: PercussionTypeDto
  /**
   * Le nombre de chargeur fournis
   * @example 1
   */
  providedMagazineQuantity: number
  /**
   * L'epaisseur exterieur du canon
   * @example 18
   */
  barrelSize: number
  /** La matiere de la crosse ou caracasse */
  buttMaterial: MaterialDto | null
  /** Guidon reglable */
  isAdjustableFrontSight: boolean
  /** Hausse reglable */
  isAdjustableBackSight: boolean
  /** la couleur de la crosse */
  buttColor: ColorDto | null
  /** la couleur du canon  */
  barrelColor: ColorDto | null
  /** @example true */
  isOpticReady: boolean
  decocking: boolean
  triggerType: WeaponTriggerTypeDto
  slideColor: ColorDto | null
  slideMaterial: MaterialDto | null
  isExternalHammer: boolean
  providedOpticReadyPlates: OpticReadyPlateDto[] | null
  /** Rail picatiny */
  isPicatinyRailSlop: boolean
  priceHistory: CreatePriceHistoryDto
  inStock: number
  id: number
  /** @example "CZ-457-VAR-22LR" */
  reference: string
  stock: StockDto | null
  createdBy: UserDto
  updatedBy: UserDto
  /** @format date-time */
  createdAt: string
  /** @format date-time */
  updatedAt: string
}

export interface WeaponMagazineDto {
  /** Capacite en munition */
  capacity: number
  /** longeur du chargeur */
  length: number
  /** hauteur du chargeur */
  height: number
  /** largeur du chargeur */
  width: number
  /** matiere du chargeur */
  body: MaterialDto
  /** marque du chargeur */
  factory: FactoryDto
  /** calibre des munitions du chargeur */
  caliber: CaliberDto
  description: string | null
  /** La categorie de l arme en france */
  category: LegislationCategoryDto
  /** Le type de l arme */
  weaponType: WeaponTypeDto
  compatibleRiffle: RiffleDto[] | null
  compatibleHandGun: HandGunDto[] | null
  /** Historique des prix */
  priceHistory: CreatePriceHistoryDto
  inStock: number
  id: number
  reference: string
  createdBy: UserDto
  updatedBy: UserDto
  /** @format date-time */
  createdAt: string
  /** @format date-time */
  updatedAt: string
  stock: StockDto | null
}

export interface CreateWeaponMagazineDto {
  /** Capacite en munition */
  capacity: number
  /** longeur du chargeur */
  length: number
  /** hauteur du chargeur */
  height: number
  /** largeur du chargeur */
  width: number
  /** matiere du chargeur */
  body: MaterialDto
  /** marque du chargeur */
  factory: FactoryDto
  /** calibre des munitions du chargeur */
  caliber: CaliberDto
  description: string | null
  /** La categorie de l arme en france */
  category: LegislationCategoryDto
  /** Le type de l arme */
  weaponType: WeaponTypeDto
  compatibleRiffle: RiffleDto[] | null
  compatibleHandGun: HandGunDto[] | null
  /** Historique des prix */
  priceHistory: CreatePriceHistoryDto
  inStock: number
}

export interface UpdateWeaponMagazineDto {
  /** Capacite en munition */
  capacity: number
  /** longeur du chargeur */
  length: number
  /** hauteur du chargeur */
  height: number
  /** largeur du chargeur */
  width: number
  /** matiere du chargeur */
  body: MaterialDto
  /** marque du chargeur */
  factory: FactoryDto
  /** calibre des munitions du chargeur */
  caliber: CaliberDto
  description: string | null
  /** La categorie de l arme en france */
  category: LegislationCategoryDto
  /** Le type de l arme */
  weaponType: WeaponTypeDto
  compatibleRiffle: RiffleDto[] | null
  compatibleHandGun: HandGunDto[] | null
  /** Historique des prix */
  priceHistory: CreatePriceHistoryDto
  inStock: number
  id: number
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
  category: LegislationCategoryDto
  /** Le calibre de l arme */
  caliber: CaliberDto
  /** la marque */
  factory: FactoryDto
  /**
   * Type d arme
   * @example "Fusil a verrou"
   */
  type: WeaponTypeDto
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
  barrelType: WeaponBarrelTypeDto
  /** Les dimmension du filletage */
  threadedSize: ThreadedSizeDto | null
  /**
   * les valeurs de poids depart de la detente
   * @example "Entre 1 et 2kg"
   */
  adjustableTriggerMinWeight: number | null
  /**
   * les valeurs de poids depart de la detente
   * @example "Entre 1 et 2kg"
   */
  adjustableTriggerMaxWeight: number | null
  /** Le type de percussion ( annulaire ou centrale ) */
  percussionType: PercussionTypeDto
  /**
   * Le nombre de chargeur fournis
   * @example 1
   */
  providedMagazineQuantity: number
  /**
   * L'epaisseur exterieur du canon
   * @example 18
   */
  barrelSize: number
  /** La matiere de la crosse ou caracasse */
  buttMaterial: MaterialDto | null
  /** Guidon reglable */
  isAdjustableFrontSight: boolean
  /** Hausse reglable */
  isAdjustableBackSight: boolean
  /** la couleur de la crosse */
  buttColor: ColorDto | null
  /** la couleur du canon  */
  barrelColor: ColorDto | null
  /** @example true */
  isOpticReady: boolean
  decocking: boolean
  triggerType: WeaponTriggerTypeDto
  slideColor: ColorDto | null
  slideMaterial: MaterialDto | null
  isExternalHammer: boolean
  providedOpticReadyPlates: OpticReadyPlateDto[] | null
  /** Rail picatiny */
  isPicatinyRailSlop: boolean
  priceHistory: CreatePriceHistoryDto
  inStock: number
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
  category: LegislationCategoryDto
  /** Le calibre de l arme */
  caliber: CaliberDto
  /** la marque */
  factory: FactoryDto
  /**
   * Type d arme
   * @example "Fusil a verrou"
   */
  type: WeaponTypeDto
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
  barrelType: WeaponBarrelTypeDto
  /** Les dimmension du filletage */
  threadedSize: ThreadedSizeDto | null
  /**
   * les valeurs de poids depart de la detente
   * @example "Entre 1 et 2kg"
   */
  adjustableTriggerMinWeight: number | null
  /**
   * les valeurs de poids depart de la detente
   * @example "Entre 1 et 2kg"
   */
  adjustableTriggerMaxWeight: number | null
  /** Le type de percussion ( annulaire ou centrale ) */
  percussionType: PercussionTypeDto
  /**
   * Le nombre de chargeur fournis
   * @example 1
   */
  providedMagazineQuantity: number
  /**
   * L'epaisseur exterieur du canon
   * @example 18
   */
  barrelSize: number
  /** La matiere de la crosse ou caracasse */
  buttMaterial: MaterialDto | null
  /** Guidon reglable */
  isAdjustableFrontSight: boolean
  /** Hausse reglable */
  isAdjustableBackSight: boolean
  /** la couleur de la crosse */
  buttColor: ColorDto | null
  /** la couleur du canon  */
  barrelColor: ColorDto | null
  /** @example true */
  isOpticReady: boolean
  decocking: boolean
  triggerType: WeaponTriggerTypeDto
  slideColor: ColorDto | null
  slideMaterial: MaterialDto | null
  isExternalHammer: boolean
  providedOpticReadyPlates: OpticReadyPlateDto[] | null
  /** Rail picatiny */
  isPicatinyRailSlop: boolean
  priceHistory: CreatePriceHistoryDto
  inStock: number
  id: number
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
  category: LegislationCategoryDto
  /** Le calibre de l arme */
  caliber: CaliberDto
  /** la marque */
  factory: FactoryDto
  /**
   * Type d arme
   * @example "Fusil a verrou"
   */
  type: WeaponTypeDto
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
  barrelType: WeaponBarrelTypeDto
  /** Les dimmension du filletage */
  threadedSize: ThreadedSizeDto | null
  /**
   * les valeurs de poids depart de la detente
   * @example "Entre 1 et 2kg"
   */
  adjustableTriggerMinWeight: number | null
  /**
   * les valeurs de poids depart de la detente
   * @example "Entre 1 et 2kg"
   */
  adjustableTriggerMaxWeight: number | null
  /** Le type de percussion ( annulaire ou centrale ) */
  percussionType: PercussionTypeDto
  /**
   * Le nombre de chargeur fournis
   * @example 1
   */
  providedMagazineQuantity: number
  /**
   * L'epaisseur exterieur du canon
   * @example 18
   */
  barrelSize: number
  /** La matiere de la crosse ou caracasse */
  buttMaterial: MaterialDto | null
  /** Guidon reglable */
  isAdjustableFrontSight: boolean
  /** Hausse reglable */
  isAdjustableBackSight: boolean
  /** la couleur de la crosse */
  buttColor: ColorDto | null
  /** la couleur du canon  */
  barrelColor: ColorDto | null
  /** Crosse ajustable en profondeur */
  isAdjustableButt: boolean
  /** Busc adjutable */
  isAdjustableBusk: boolean
  railSize: RailSizeDto | null
  /** Grenadiere */
  grenadierSlot: number
  /** Port QC */
  qcSlot: number
  /** Rail Mlock */
  isMlockCompatibility: boolean
  /** Visee ouverte ? */
  isOpenAim: boolean
  mLockOptions: MLockOptionDto[] | null
  priceHistory: CreatePriceHistoryDto
  inStock: number
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
  category: LegislationCategoryDto
  /** Le calibre de l arme */
  caliber: CaliberDto
  /** la marque */
  factory: FactoryDto
  /**
   * Type d arme
   * @example "Fusil a verrou"
   */
  type: WeaponTypeDto
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
  barrelType: WeaponBarrelTypeDto
  /** Les dimmension du filletage */
  threadedSize: ThreadedSizeDto | null
  /**
   * les valeurs de poids depart de la detente
   * @example "Entre 1 et 2kg"
   */
  adjustableTriggerMinWeight: number | null
  /**
   * les valeurs de poids depart de la detente
   * @example "Entre 1 et 2kg"
   */
  adjustableTriggerMaxWeight: number | null
  /** Le type de percussion ( annulaire ou centrale ) */
  percussionType: PercussionTypeDto
  /**
   * Le nombre de chargeur fournis
   * @example 1
   */
  providedMagazineQuantity: number
  /**
   * L'epaisseur exterieur du canon
   * @example 18
   */
  barrelSize: number
  /** La matiere de la crosse ou caracasse */
  buttMaterial: MaterialDto | null
  /** Guidon reglable */
  isAdjustableFrontSight: boolean
  /** Hausse reglable */
  isAdjustableBackSight: boolean
  /** la couleur de la crosse */
  buttColor: ColorDto | null
  /** la couleur du canon  */
  barrelColor: ColorDto | null
  /** Crosse ajustable en profondeur */
  isAdjustableButt: boolean
  /** Busc adjutable */
  isAdjustableBusk: boolean
  railSize: RailSizeDto | null
  /** Grenadiere */
  grenadierSlot: number
  /** Port QC */
  qcSlot: number
  /** Rail Mlock */
  isMlockCompatibility: boolean
  /** Visee ouverte ? */
  isOpenAim: boolean
  mLockOptions: MLockOptionDto[] | null
  priceHistory: CreatePriceHistoryDto
  inStock: number
  id: number
}

export interface CreateStockDto {
  quantity: number
  movementType: string
  object: string
  objectId: number
  reason: string | null
}

export interface PriceHistoryDto {
  supplierPrice: number
  recommendedSalePrice: number
  currentSalePrice: number
  supplier: SupplierDto
  objectId: number
  object: string
  id: number
  /** @format date-time */
  createdAt: string
  createdBy: UserDto | null
  updatedBy: UserDto | null
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
  caliber: CaliberDto
  factory: FactoryDto
  priceHistory: CreatePriceHistoryDto
  inStock: number
  id: number
  reference: string
  stock: StockDto | null
  createdBy: UserDto
  updatedBy: UserDto
  /** @format date-time */
  createdAt: string
  /** @format date-time */
  updatedAt: string
}

export interface AmmunitionFilter {
  /**
   * Nombre maximum de résultats à renvoyer
   * @example 10
   */
  limit?: number
  /**
   * Décalage pour la pagination
   * @example 0
   */
  offset?: number
  /** @example "Reference interne de l objet" */
  reference?: string
  /** @example "La categorie de la munition" */
  category?: string
  /** @example "La marque" */
  factory?: string
  /** @example "Le calibre" */
  caliber?: string
  /** @example "Le nom du moodel de munition" */
  name?: string
}

export interface CreateAmmunitionDto {
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
  caliber: CaliberDto
  factory: FactoryDto
  priceHistory: CreatePriceHistoryDto
  inStock: number
}

export interface UpdateAmmunitionDto {
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
  caliber: CaliberDto
  factory: FactoryDto
  priceHistory: CreatePriceHistoryDto
  inStock: number
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

export interface UserCredentialDto {
  email: string
  password: string
}

export interface TokenDto {
  accessToken: string
}

export interface OpticFilter {
  /**
   * Nombre maximum de résultats à renvoyer
   * @example 10
   */
  limit?: number
  /**
   * Décalage pour la pagination
   * @example 0
   */
  offset?: number
  /** @example "Reference interne de l objet" */
  reference?: string
  /** @example "Nom de lunette" */
  name?: string
  /** @example "La marque" */
  factory?: string
  /** @example "Le type de lunette" */
  type?: string
  /** @example "Le type de plan focal" */
  focalPlane?: string
}

export interface OpticUnitDto {
  id: number
  name: string
}

export interface OpticClickValueDto {
  name: string
  opticUnit: OpticUnitDto
  id: number
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
  name: string
  factory: FactoryDto
  /** @example "Une description de l optique ..." */
  description: string | null
  maxZoom: number
  minZoom: number
  maxDrift: number
  maxElevation: number
  clickValue: OpticClickValueDto
  bodyDiameter: number
  lensDiameter: number
  minParallax: number
  maxParallax: number
  isParallax: boolean
  opticUnit: OpticUnitDto
  focalPlane: FocalPlaneDto
  opticType: OpticTypeDto
  length: number
  eyeRelief: number
  isCollarsProvided: boolean
  priceHistory: CreatePriceHistoryDto
  providedOpticCollarSize: RailSizeDto | null
  inStock: number
  id: number
  createdBy: UserDto
  updatedBy: UserDto
  /** @format date-time */
  createdAt: string
  /** @format date-time */
  updatedAt: string
  stock: StockDto | null
  reference: string
}

export interface CreateOpticDto {
  name: string
  factory: FactoryDto
  /** @example "Une description de l optique ..." */
  description: string | null
  maxZoom: number
  minZoom: number
  maxDrift: number
  maxElevation: number
  clickValue: OpticClickValueDto
  bodyDiameter: number
  lensDiameter: number
  minParallax: number
  maxParallax: number
  isParallax: boolean
  opticUnit: OpticUnitDto
  focalPlane: FocalPlaneDto
  opticType: OpticTypeDto
  length: number
  eyeRelief: number
  isCollarsProvided: boolean
  priceHistory: CreatePriceHistoryDto
  providedOpticCollarSize: RailSizeDto | null
  inStock: number
}

export interface UpdateOpticDto {
  name: string
  factory: FactoryDto
  /** @example "Une description de l optique ..." */
  description: string | null
  maxZoom: number
  minZoom: number
  maxDrift: number
  maxElevation: number
  clickValue: OpticClickValueDto
  bodyDiameter: number
  lensDiameter: number
  minParallax: number
  maxParallax: number
  isParallax: boolean
  opticUnit: OpticUnitDto
  focalPlane: FocalPlaneDto
  opticType: OpticTypeDto
  length: number
  eyeRelief: number
  isCollarsProvided: boolean
  priceHistory: CreatePriceHistoryDto
  providedOpticCollarSize: RailSizeDto | null
  inStock: number
  id: number
}

export interface CreateOpticTypeDto {
  name: string
  reference: string
}

export interface OpticCollarFilter {
  /**
   * Nombre maximum de résultats à renvoyer
   * @example 10
   */
  limit?: number
  /**
   * Décalage pour la pagination
   * @example 0
   */
  offset?: number
  /** @example "Reference interne de l objet" */
  reference?: string
  /** @example "Nom du model de collier" */
  name?: string
  /** @example "La marque" */
  factory?: string
  /** @example "Le type de rail compatible" */
  railSize?: string
}

export interface OpticCollarDto {
  diameter: number
  height: number
  railSize: RailSizeDto
  factory: FactoryDto
  name: string
  /** @example "Une description du ou des colliers" */
  description: string
  priceHistory: CreatePriceHistoryDto
  inStock: number
  id: number
  reference: string
  createdBy: UserDto
  updatedBy: UserDto
  /** @format date-time */
  createdAt: string
  /** @format date-time */
  updatedAt: string
  stock: StockDto | null
}

export interface CreateOpticCollarDto {
  diameter: number
  height: number
  railSize: RailSizeDto
  factory: FactoryDto
  name: string
  /** @example "Une description du ou des colliers" */
  description: string
  priceHistory: CreatePriceHistoryDto
  inStock: number
}

export interface UpdateOpticCollarDto {
  diameter: number
  height: number
  railSize: RailSizeDto
  factory: FactoryDto
  name: string
  /** @example "Une description du ou des colliers" */
  description: string
  priceHistory: CreatePriceHistoryDto
  inStock: number
  id: number
}

export interface SoundNoiseFilter {
  /**
   * Nombre maximum de résultats à renvoyer
   * @example 10
   */
  limit?: number
  /**
   * Décalage pour la pagination
   * @example 0
   */
  offset?: number
  /** @example "Reference interne de l objet" */
  reference?: string
  /** @example "La marque" */
  factory?: string
  /** @example "Le calibre compatible" */
  caliber?: string
  /** @example "Le nom du rds" */
  name?: string
}

export interface SoundNoiseReducerDto {
  caliber: CaliberDto
  factory: FactoryDto
  threadedSize: ThreadedSizeDto
  /** Diametre exterieur */
  diameter: number
  /** Longueur */
  length: number
  /** Nombre de chicane */
  chicane: number
  /** Decibel attenue selon constructeur  */
  estimatedNoiseReduction: number
  /** Nom du modele */
  name: string
  description: string
  /** Demontable pour nettoyage */
  isCleanable: boolean
  /** Historique des prix */
  priceHistory: CreatePriceHistoryDto
  inStock: number
  id: number
  reference: string
  createdBy: UserDto
  updatedBy: UserDto
  /**
   * Date de creation
   * @format date-time
   */
  createdAt: string
  /**
   * Date de mise a jour
   * @format date-time
   */
  updatedAt: string
  stock: StockDto | null
}

export interface CreateSoundNoiseReducerDto {
  caliber: CaliberDto
  factory: FactoryDto
  threadedSize: ThreadedSizeDto
  /** Diametre exterieur */
  diameter: number
  /** Longueur */
  length: number
  /** Nombre de chicane */
  chicane: number
  /** Decibel attenue selon constructeur  */
  estimatedNoiseReduction: number
  /** Nom du modele */
  name: string
  description: string
  /** Demontable pour nettoyage */
  isCleanable: boolean
  /** Historique des prix */
  priceHistory: CreatePriceHistoryDto
  inStock: number
}

export interface UpdateSoundNoiseReducerDto {
  caliber: CaliberDto
  factory: FactoryDto
  threadedSize: ThreadedSizeDto
  /** Diametre exterieur */
  diameter: number
  /** Longueur */
  length: number
  /** Nombre de chicane */
  chicane: number
  /** Decibel attenue selon constructeur  */
  estimatedNoiseReduction: number
  /** Nom du modele */
  name: string
  description: string
  /** Demontable pour nettoyage */
  isCleanable: boolean
  /** Historique des prix */
  priceHistory: CreatePriceHistoryDto
  inStock: number
  id: number
}

export interface ItemInvoice {
  name: string
  reference: string
  unitPriceHt: number
  quantity: number
  totalPriceHT: number
  caliber: CaliberDto | null
  colors: string | null
  description: string
  id: number
  status: string
  factory: FactoryDto
  /** @example "C" */
  category: LegislationCategoryDto | null
}

export interface InvoiceSupplierDto {
  comment: string
  supplier: SupplierDto
  /** @format date-time */
  dueDate: string
  shippingCost: number
  /** @format date-time */
  createdAt: string
  /** @format date-time */
  updatedAt: string
  createdBy: UserDto
  id: number
  internalInvoiceReference: string
  invoiceSupplierReference: string
  items: ItemInvoice[]
  totalPriceHt: number
  totalInvoiceItems: number
  totalAccountHT: number
  vat: number
  invoiceStatus: string
}

export interface CountInvoicesDto {
  inOrder: number
  inShipping: number
  received: number
  archive: number
}

export interface CreateItemInvoiceSupplierDto {
  quantity: number
  object: string
  objectId: number
  accountHT: number
  comment: string
  description: string
  supplierPriceHT: number
  status: string
  id: number | null
}

export interface CreateInvoiceSupplierDto {
  comment: string
  supplier: SupplierDto
  /** @format date-time */
  dueDate: string
  shippingCost: number
  vat: number
  items: CreateItemInvoiceSupplierDto[]
  invoiceSupplierReference: string | null
}

export interface UpdateInvoiceSupplierDto {
  comment: string
  supplier: SupplierDto
  /** @format date-time */
  dueDate: string
  shippingCost: number
  vat: number
  items: CreateItemInvoiceSupplierDto[]
  invoiceSupplierReference: string | null
  id: number
}

export interface UpdateBulkItemStatusDto {
  ids: number[]
  status: string
}

export type ItemInvoiceSupplier = object

export interface UpdateItemStatusDto {
  status: string
}

export enum WeaponTypeDtoTypeEnum {
  Handgun = 'handgun',
  Riffle = 'riffle'
}

export enum UserDtoRoleEnum {
  USER = 'USER',
  ADMIN = 'ADMIN'
}

export enum CreateUserDtoRoleEnum {
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
 * @version 0.2.3
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
     * @summary Liste complète
     * @request GET:/api/factory/all
     */
    factoryControllerFindAll: (
      query?: {
        /** Filtre de recherche pour reponse paginé */
        filters?: FactoryFilter
      },
      params: RequestParams = {}
    ) =>
      this.request<
        PaginatedResponseDto & {
          data?: FactoryDto[]
        },
        any
      >({
        path: `/api/factory/all`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params
      }),

    /**
     * @description Retourne le detail de la marque
     *
     * @tags Factory
     * @name FactoryControllerFindById
     * @summary Filtré par id
     * @request GET:/api/factory/by/id/{id}
     */
    factoryControllerFindById: (id: number, params: RequestParams = {}) =>
      this.request<FactoryDto, any>({
        path: `/api/factory/by/id/${id}`,
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
     * @request GET:/api/factory/by/category/{type}
     */
    factoryControllerFindByType: (type: string, params: RequestParams = {}) =>
      this.request<FactoryDto[], any>({
        path: `/api/factory/by/category/${type}`,
        method: 'GET',
        format: 'json',
        ...params
      }),

    /**
     * @description Ajout d une nouvelle marque pour un type specifique et retourne le dto apres creation
     *
     * @tags Factory
     * @name FactoryControllerCreate
     * @summary Creation
     * @request POST:/api/factory
     * @secure
     */
    factoryControllerCreate: (data: CreateFactoryDto, params: RequestParams = {}) =>
      this.request<FactoryDto, any>({
        path: `/api/factory`,
        method: 'POST',
        body: data,
        secure: true,
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
     * @secure
     */
    factoryControllerEdit: (id: number, data: UpdateFactoryDto, params: RequestParams = {}) =>
      this.request<FactoryDto, any>({
        path: `/api/factory/${id}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Sppression logique de la marque
     *
     * @tags Factory
     * @name FactoryControllerDelete
     * @summary Suppresion logique
     * @request DELETE:/api/factory/{id}
     * @secure
     */
    factoryControllerDelete: (id: number, params: RequestParams = {}) =>
      this.request<ApiDeleteResponseDto, any>({
        path: `/api/factory/${id}`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Retourne la liste de tous les calibres disponible
     *
     * @tags Caliber
     * @name CaliberControllerFindAllCalibers
     * @summary Liste complète
     * @request GET:/api/caliber/all
     */
    caliberControllerFindAllCalibers: (params: RequestParams = {}) =>
      this.request<CaliberDto[], any>({
        path: `/api/caliber/all`,
        method: 'GET',
        format: 'json',
        ...params
      }),

    /**
     * @description Retourne le detail de l optique
     *
     * @tags Caliber
     * @name CaliberControllerFindById
     * @summary Filtré par id
     * @request GET:/api/caliber/by/id/{id}
     */
    caliberControllerFindById: (id: number, params: RequestParams = {}) =>
      this.request<CaliberDto, any>({
        path: `/api/caliber/by/id/${id}`,
        method: 'GET',
        format: 'json',
        ...params
      }),

    /**
     * @description Ajout d un nouveau calibre en base de donnee
     *
     * @tags Caliber
     * @name CaliberControllerCreate
     * @summary Creation
     * @request POST:/api/caliber
     * @secure
     */
    caliberControllerCreate: (data: CreateCaliberDto, params: RequestParams = {}) =>
      this.request<CaliberDto, any>({
        path: `/api/caliber`,
        method: 'POST',
        body: data,
        secure: true,
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
     * @secure
     */
    caliberControllerEdit: (id: number, data: CaliberDto, params: RequestParams = {}) =>
      this.request<CaliberDto, any>({
        path: `/api/caliber/${id}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Soft delete  d un  calibre
     *
     * @tags Caliber
     * @name CaliberControllerDelete
     * @summary Suppresion logique
     * @request DELETE:/api/caliber/{id}
     * @secure
     */
    caliberControllerDelete: (id: number, params: RequestParams = {}) =>
      this.request<ApiDeleteResponseDto, any>({
        path: `/api/caliber/${id}`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Retourne la liste des filletage disponible
     *
     * @tags Threaded-size
     * @name ThreadedSizeControllerFindAllThreadedSize
     * @summary Liste complète
     * @request GET:/api/threaded-size/all
     */
    threadedSizeControllerFindAllThreadedSize: (params: RequestParams = {}) =>
      this.request<ThreadedSizeDto[], any>({
        path: `/api/threaded-size/all`,
        method: 'GET',
        format: 'json',
        ...params
      }),

    /**
     * @description Retourne le detail du filletage
     *
     * @tags Threaded-size
     * @name ThreadedSizeControllerFindById
     * @summary Filtré par id
     * @request GET:/api/threaded-size/by/id/{id}
     */
    threadedSizeControllerFindById: (id: number, params: RequestParams = {}) =>
      this.request<ThreadedSizeDto, any>({
        path: `/api/threaded-size/by/id/${id}`,
        method: 'GET',
        format: 'json',
        ...params
      }),

    /**
     * @description Ajouter un nouveux type de filetage arme ou rds
     *
     * @tags Threaded-size
     * @name ThreadedSizeControllerCreate
     * @summary Creation
     * @request POST:/api/threaded-size
     * @secure
     */
    threadedSizeControllerCreate: (data: CreateThreadedSizeDto, params: RequestParams = {}) =>
      this.request<ThreadedSizeDto, any>({
        path: `/api/threaded-size`,
        method: 'POST',
        body: data,
        secure: true,
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
     * @secure
     */
    threadedSizeControllerEdit: (id: number, data: ThreadedSizeDto, params: RequestParams = {}) =>
      this.request<ThreadedSizeDto, any>({
        path: `/api/threaded-size/${id}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Soft delete  d un  filletage
     *
     * @tags Threaded-size
     * @name ThreadedSizeControllerDelete
     * @summary Suppresion logique
     * @request DELETE:/api/threaded-size/{id}
     * @secure
     */
    threadedSizeControllerDelete: (id: number, params: RequestParams = {}) =>
      this.request<ApiDeleteResponseDto, any>({
        path: `/api/threaded-size/${id}`,
        method: 'DELETE',
        secure: true,
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
     * @description Retourne la listes de toutes les marques sans distinction
     *
     * @tags Color
     * @name ColorControllerFindAll
     * @summary Liste complète
     * @request GET:/api/color/all
     */
    colorControllerFindAll: (params: RequestParams = {}) =>
      this.request<ColorDto[], any>({
        path: `/api/color/all`,
        method: 'GET',
        format: 'json',
        ...params
      }),

    /**
     * @description Retourne le detail du chargeur
     *
     * @tags Color
     * @name ColorControllerFindById
     * @summary Filtré par id
     * @request GET:/api/color/by/id/{id}
     */
    colorControllerFindById: (id: number, params: RequestParams = {}) =>
      this.request<ColorDto, any>({
        path: `/api/color/by/id/${id}`,
        method: 'GET',
        format: 'json',
        ...params
      }),

    /**
     * @description Ajoute une nouvelle couleur
     *
     * @tags Color
     * @name ColorControllerCreate
     * @summary Creation
     * @request POST:/api/color
     * @secure
     */
    colorControllerCreate: (data: CreateColorDto, params: RequestParams = {}) =>
      this.request<ColorDto, any>({
        path: `/api/color`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Edition d une couleur
     *
     * @tags Color
     * @name ColorControllerEdit
     * @summary Edition
     * @request PUT:/api/color/{id}
     * @secure
     */
    colorControllerEdit: (id: number, data: ColorDto, params: RequestParams = {}) =>
      this.request<ColorDto, any>({
        path: `/api/color/${id}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Sppression logique de la couleur
     *
     * @tags Color
     * @name ColorControllerDelete
     * @summary Suppresion logique
     * @request DELETE:/api/color/{id}
     * @secure
     */
    colorControllerDelete: (id: number, params: RequestParams = {}) =>
      this.request<ApiDeleteResponseDto, any>({
        path: `/api/color/${id}`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Retourne la listes de toutes les marques sans distinction
     *
     * @tags Material
     * @name MaterialControllerFindAll
     * @summary Liste complète
     * @request GET:/api/material/all
     */
    materialControllerFindAll: (params: RequestParams = {}) =>
      this.request<MaterialDto[], any>({
        path: `/api/material/all`,
        method: 'GET',
        format: 'json',
        ...params
      }),

    /**
     * @description Retourne le detail du chargeur
     *
     * @tags Material
     * @name MaterialControllerFindById
     * @summary Filtré par id
     * @request GET:/api/material/by/id/{id}
     */
    materialControllerFindById: (id: number, params: RequestParams = {}) =>
      this.request<MaterialDto, any>({
        path: `/api/material/by/id/${id}`,
        method: 'GET',
        format: 'json',
        ...params
      }),

    /**
     * @description Ajoute une nouvelle couleur
     *
     * @tags Material
     * @name MaterialControllerCreate
     * @summary Creation
     * @request POST:/api/material
     * @secure
     */
    materialControllerCreate: (data: CreateMaterialDto, params: RequestParams = {}) =>
      this.request<MaterialDto, any>({
        path: `/api/material`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Edition d une matiere
     *
     * @tags Material
     * @name MaterialControllerEdit
     * @summary Edition
     * @request PUT:/api/material/{id}
     * @secure
     */
    materialControllerEdit: (id: number, data: MaterialDto, params: RequestParams = {}) =>
      this.request<MaterialDto, any>({
        path: `/api/material/${id}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Sppression logique du materiau
     *
     * @tags Material
     * @name MaterialControllerDelete
     * @summary Suppresion logique
     * @request DELETE:/api/material/{id}
     * @secure
     */
    materialControllerDelete: (id: number, params: RequestParams = {}) =>
      this.request<ApiDeleteResponseDto, any>({
        path: `/api/material/${id}`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Retourne la listes de toutes les taille de rail optique
     *
     * @tags Rail-size
     * @name RailSizeControllerFindAll
     * @summary Liste complète
     * @request GET:/api/rail-size/all
     */
    railSizeControllerFindAll: (params: RequestParams = {}) =>
      this.request<RailSizeDto[], any>({
        path: `/api/rail-size/all`,
        method: 'GET',
        format: 'json',
        ...params
      }),

    /**
     * @description Retourne la liste complete des types de percussion
     *
     * @tags Percussion-type
     * @name PercussionTypeControllerFindAll
     * @summary Liste complète
     * @request GET:/api/percussion-type/all
     */
    percussionTypeControllerFindAll: (params: RequestParams = {}) =>
      this.request<LegislationCategoryDto[], any>({
        path: `/api/percussion-type/all`,
        method: 'GET',
        format: 'json',
        ...params
      }),

    /**
     * @description Retourne la liste complete des type de detente d arme
     *
     * @tags Optic-ready-plate
     * @name OpticReadyPlateControllerFindAll
     * @summary Liste complète
     * @request GET:/api/optic-ready-plate/all
     */
    opticReadyPlateControllerFindAll: (params: RequestParams = {}) =>
      this.request<OpticReadyPlateDto[], any>({
        path: `/api/optic-ready-plate/all`,
        method: 'GET',
        format: 'json',
        ...params
      }),

    /**
     * @description Retourne le detail de la plaque optic ready
     *
     * @tags Optic-ready-plate
     * @name OpticReadyPlateControllerFindById
     * @summary Filtré par id
     * @request GET:/api/optic-ready-plate/by/id/{id}
     */
    opticReadyPlateControllerFindById: (id: number, params: RequestParams = {}) =>
      this.request<OpticReadyPlateDto, any>({
        path: `/api/optic-ready-plate/by/id/${id}`,
        method: 'GET',
        format: 'json',
        ...params
      }),

    /**
     * @description Ajout d une nouvelle plaque optic ready
     *
     * @tags Optic-ready-plate
     * @name OpticReadyPlateControllerCreate
     * @summary Creation
     * @request POST:/api/optic-ready-plate
     * @secure
     */
    opticReadyPlateControllerCreate: (data: CreateOpticReadyPlateDto, params: RequestParams = {}) =>
      this.request<OpticReadyPlateDto, any>({
        path: `/api/optic-ready-plate`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Edition d une plaque OR
     *
     * @tags Optic-ready-plate
     * @name OpticReadyPlateControllerEdit
     * @summary Edition
     * @request PUT:/api/optic-ready-plate/{id}
     * @secure
     */
    opticReadyPlateControllerEdit: (
      id: number,
      data: OpticReadyPlateDto,
      params: RequestParams = {}
    ) =>
      this.request<OpticReadyPlateDto, any>({
        path: `/api/optic-ready-plate/${id}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Sppression logique de la marque
     *
     * @tags Optic-ready-plate
     * @name OpticReadyPlateControllerDelete
     * @summary Suppression logique
     * @request DELETE:/api/optic-ready-plate/{id}
     * @secure
     */
    opticReadyPlateControllerDelete: (id: number, params: RequestParams = {}) =>
      this.request<ApiDeleteResponseDto, any>({
        path: `/api/optic-ready-plate/${id}`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Retourne la listes de toutes les marques sans distinction
     *
     * @tags FactoryType
     * @name FactoryTypeControllerFindAll
     * @summary Liste complète
     * @request GET:/api/factory-type/all
     */
    factoryTypeControllerFindAll: (params: RequestParams = {}) =>
      this.request<FactoryTypeDto[], any>({
        path: `/api/factory-type/all`,
        method: 'GET',
        format: 'json',
        ...params
      }),

    /**
     * @description Retourne la liste des diffents type d armes possible
     *
     * @tags Weapon type
     * @name WeaponTypeControllerFindAllWeaponTypes
     * @summary Liste complète
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
     * @description Retourne le detail du chargeur
     *
     * @tags Weapon type
     * @name WeaponTypeControllerFindById
     * @summary Filtré par id
     * @request GET:/api/weapon-type/by/id/{id}
     */
    weaponTypeControllerFindById: (id: number, params: RequestParams = {}) =>
      this.request<WeaponTypeDto, any>({
        path: `/api/weapon-type/by/id/${id}`,
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
     * @summary Creation
     * @request POST:/api/weapon-type
     * @secure
     */
    weaponTypeControllerCreate: (data: CreateWeaponTypeDto, params: RequestParams = {}) =>
      this.request<WeaponTypeDto, any>({
        path: `/api/weapon-type`,
        method: 'POST',
        body: data,
        secure: true,
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
     * @secure
     */
    weaponTypeControllerEdit: (id: number, data: UpdateWeaponTypeDto, params: RequestParams = {}) =>
      this.request<WeaponTypeDto, any>({
        path: `/api/weapon-type/${id}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Suppression logique d un type d arme
     *
     * @tags Weapon type
     * @name WeaponTypeControllerDelete
     * @summary Suppresion logique
     * @request DELETE:/api/weapon-type/{id}
     * @secure
     */
    weaponTypeControllerDelete: (id: number, params: RequestParams = {}) =>
      this.request<ApiDeleteResponseDto, any>({
        path: `/api/weapon-type/${id}`,
        method: 'DELETE',
        secure: true,
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
    magazineControllerFindAll: (
      query?: {
        /** Filtre de recherche pour reponse paginé */
        filters?: MagazineFilter
      },
      params: RequestParams = {}
    ) =>
      this.request<
        PaginatedResponseDto & {
          data?: WeaponMagazineDto[]
        },
        any
      >({
        path: `/api/magazine/all`,
        method: 'GET',
        query: query,
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
     * @request GET:/api/magazine/by/factory/{factoryName}
     */
    magazineControllerFindByFactory: (factoryName: string, params: RequestParams = {}) =>
      this.request<WeaponMagazineDto[], any>({
        path: `/api/magazine/by/factory/${factoryName}`,
        method: 'GET',
        format: 'json',
        ...params
      }),

    /**
     * @description Retourne les chargeurs filtres par categories
     *
     * @tags Magazine
     * @name MagazineControllerFindByCategory
     * @summary Filtré par categorie
     * @request GET:/api/magazine/by/category/{category}
     */
    magazineControllerFindByCategory: (category: string, params: RequestParams = {}) =>
      this.request<WeaponMagazineDto[], any>({
        path: `/api/magazine/by/category/${category}`,
        method: 'GET',
        format: 'json',
        ...params
      }),

    /**
     * @description Ajoute un nouveau chargeur en bdd et le retoune
     *
     * @tags Magazine
     * @name MagazineControllerCreate
     * @summary Creation
     * @request POST:/api/magazine
     * @secure
     */
    magazineControllerCreate: (data: CreateWeaponMagazineDto, params: RequestParams = {}) =>
      this.request<WeaponMagazineDto, any>({
        path: `/api/magazine`,
        method: 'POST',
        body: data,
        secure: true,
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
     * @secure
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
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Suppression logique  d un chargeur
     *
     * @tags Magazine
     * @name MagazineControllerDelete
     * @summary Suppresion logique
     * @request DELETE:/api/magazine/{id}
     * @secure
     */
    magazineControllerDelete: (id: number, params: RequestParams = {}) =>
      this.request<ApiDeleteResponseDto, any>({
        path: `/api/magazine/${id}`,
        method: 'DELETE',
        secure: true,
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
     * @request GET:/api/hand-gun/by/category/{category}
     */
    handGunControllerFindAllByCategory: (category: string, params: RequestParams = {}) =>
      this.request<HandGunDto[], any>({
        path: `/api/hand-gun/by/category/${category}`,
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
     * @secure
     */
    handGunControllerCreate: (data: CreateHandGunDto, params: RequestParams = {}) =>
      this.request<HandGunDto, any>({
        path: `/api/hand-gun`,
        method: 'POST',
        body: data,
        secure: true,
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
     * @secure
     */
    handGunControllerUpdate: (id: number, data: UpdateHandGunDto, params: RequestParams = {}) =>
      this.request<HandGunDto, any>({
        path: `/api/hand-gun/${id}`,
        method: 'PUT',
        body: data,
        secure: true,
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
     * @secure
     */
    handGunControllerDelete: (id: number, params: RequestParams = {}) =>
      this.request<ApiDeleteResponseDto, any>({
        path: `/api/hand-gun/${id}`,
        method: 'DELETE',
        secure: true,
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
     * @request GET:/api/riffle/by/category/{category}
     */
    riffleControllerFindAllByCategory: (category: string, params: RequestParams = {}) =>
      this.request<RiffleDto[], any>({
        path: `/api/riffle/by/category/${category}`,
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
     * @secure
     */
    riffleControllerCreate: (data: CreateRiffleDto, params: RequestParams = {}) =>
      this.request<RiffleDto, any>({
        path: `/api/riffle`,
        method: 'POST',
        body: data,
        secure: true,
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
     * @secure
     */
    riffleControllerUpdate: (id: number, data: UpdateRiffleDto, params: RequestParams = {}) =>
      this.request<RiffleDto, any>({
        path: `/api/riffle/${id}`,
        method: 'PUT',
        body: data,
        secure: true,
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
     * @secure
     */
    riffleControllerDelete: (id: number, params: RequestParams = {}) =>
      this.request<ApiDeleteResponseDto, any>({
        path: `/api/riffle/${id}`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Retourne la liste de toutes les douilles disponible
     *
     * @tags BarrelType
     * @name BarrelTypeControllerFindAll
     * @summary Liste complète
     * @request GET:/api/barrel-type
     */
    barrelTypeControllerFindAll: (params: RequestParams = {}) =>
      this.request<WeaponBarrelTypeDto[], any>({
        path: `/api/barrel-type`,
        method: 'GET',
        format: 'json',
        ...params
      }),

    /**
     * @description Retourne la liste des diffents type d armes possible
     *
     * @tags Reload mode
     * @name ReloadModeControllerFindAll
     * @summary Liste complète
     * @request GET:/api/reload-mode/all
     */
    reloadModeControllerFindAll: (params: RequestParams = {}) =>
      this.request<WeaponReloadModeDto[], any>({
        path: `/api/reload-mode/all`,
        method: 'GET',
        format: 'json',
        ...params
      }),

    /**
     * @description Retourne la liste complete des type de detente d arme
     *
     * @tags Trigger-type
     * @name TriggerTypeControllerFindAll
     * @summary Liste complète
     * @request GET:/api/trigger-type/all
     */
    triggerTypeControllerFindAll: (params: RequestParams = {}) =>
      this.request<WeaponTriggerTypeDto[], any>({
        path: `/api/trigger-type/all`,
        method: 'GET',
        format: 'json',
        ...params
      }),

    /**
     * @description Retourne la listes de toutes les positions MLOCK
     *
     * @tags M Lock Options
     * @name MLockOptionControllerFindAll
     * @summary Liste complète
     * @request GET:/api/m-lock-option/all
     */
    mLockOptionControllerFindAll: (params: RequestParams = {}) =>
      this.request<MLockOptionDto[], any>({
        path: `/api/m-lock-option/all`,
        method: 'GET',
        format: 'json',
        ...params
      }),

    /**
     * @description Stock par id d objet
     *
     * @tags Stock
     * @name StockControllerFindByStockableObjectAndId
     * @summary by/id/:id
     * @request GET:/api/stock/by/{object}/{objectId}
     */
    stockControllerFindByStockableObjectAndId: (
      object: string,
      objectId: number,
      params: RequestParams = {}
    ) =>
      this.request<StockDto, any>({
        path: `/api/stock/by/${object}/${objectId}`,
        method: 'GET',
        format: 'json',
        ...params
      }),

    /**
     * @description Mise a jour du stock
     *
     * @tags Stock
     * @name StockControllerUpdateStock
     * @summary Creation
     * @request POST:/api/stock
     * @secure
     */
    stockControllerUpdateStock: (data: CreateStockDto, params: RequestParams = {}) =>
      this.request<StockDto, any>({
        path: `/api/stock`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Retourne la liste des historiques de prix disponible
     *
     * @tags Price-history
     * @name PriceHistoryControllerFindByTypeAndObject
     * @summary Liste complète
     * @request GET:/api/price-history/{type}/{objectId}
     */
    priceHistoryControllerFindByTypeAndObject: (
      type: string,
      objectId: number,
      params: RequestParams = {}
    ) =>
      this.request<PriceHistoryDto[], any>({
        path: `/api/price-history/${type}/${objectId}`,
        method: 'GET',
        format: 'json',
        ...params
      }),

    /**
     * @description Retourne la liste complete des plans focal
     *
     * @tags Supplier
     * @name SupplierControllerFindAll
     * @summary Liste complète
     * @request GET:/api/supplier/all
     * @secure
     */
    supplierControllerFindAll: (params: RequestParams = {}) =>
      this.request<SupplierDto[], any>({
        path: `/api/supplier/all`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Retourne la munition trouver par son id
     *
     * @tags Ammunition
     * @name AmmunitionControllerFindById
     * @summary Filtré par id
     * @request GET:/api/ammunition/by/id/{id}
     */
    ammunitionControllerFindById: (id: number, params: RequestParams = {}) =>
      this.request<AmmunitionDto, any>({
        path: `/api/ammunition/by/id/${id}`,
        method: 'GET',
        format: 'json',
        ...params
      }),

    /**
     * @description Retourne la liste des munitions filtre par calibre
     *
     * @tags Ammunition
     * @name AmmunitionControllerFindAll
     * @summary Filtré par categorie
     * @request GET:/api/ammunition/all
     */
    ammunitionControllerFindAll: (
      query?: {
        /** Filtre de recherche pour reponse paginé */
        filters?: AmmunitionFilter
      },
      params: RequestParams = {}
    ) =>
      this.request<
        PaginatedResponseDto & {
          data?: AmmunitionDto[]
        },
        any
      >({
        path: `/api/ammunition/all`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params
      }),

    /**
     * @description Creation d une nouvelle munition
     *
     * @tags Ammunition
     * @name AmmunitionControllerCreate
     * @summary Creation
     * @request POST:/api/ammunition
     * @secure
     */
    ammunitionControllerCreate: (data: CreateAmmunitionDto, params: RequestParams = {}) =>
      this.request<AmmunitionDto, any>({
        path: `/api/ammunition`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Edition d une munition
     *
     * @tags Ammunition
     * @name AmmunitionControllerEdit
     * @summary Edition
     * @request PUT:/api/ammunition/{id}
     * @secure
     */
    ammunitionControllerEdit: (id: number, data: UpdateAmmunitionDto, params: RequestParams = {}) =>
      this.request<AmmunitionDto, any>({
        path: `/api/ammunition/${id}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Suppression logique d une munition
     *
     * @tags Ammunition
     * @name AmmunitionControllerDelete
     * @summary Suppresion logique
     * @request DELETE:/api/ammunition/{id}
     * @secure
     */
    ammunitionControllerDelete: (id: number, params: RequestParams = {}) =>
      this.request<ApiDeleteResponseDto, any>({
        path: `/api/ammunition/${id}`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Retourne la liste de toutes les oviges disponibles
     *
     * @tags AmmunitionHeadType
     * @name AmmunitionHeadTypeControllerFindAllHeadTypes
     * @summary Liste complète
     * @request GET:/api/ammunition-head-type/all
     */
    ammunitionHeadTypeControllerFindAllHeadTypes: (params: RequestParams = {}) =>
      this.request<AmmunitionHeadTypeDto[], any>({
        path: `/api/ammunition-head-type/all`,
        method: 'GET',
        format: 'json',
        ...params
      }),

    /**
     * @description Retourne le detail de le l ogive
     *
     * @tags AmmunitionHeadType
     * @name AmmunitionHeadTypeControllerFindById
     * @summary Filtré par id
     * @request GET:/api/ammunition-head-type/by/id/{id}
     */
    ammunitionHeadTypeControllerFindById: (id: number, params: RequestParams = {}) =>
      this.request<AmmunitionHeadTypeDto, any>({
        path: `/api/ammunition-head-type/by/id/${id}`,
        method: 'GET',
        format: 'json',
        ...params
      }),

    /**
     * @description Creattion d un nouveau type d ogive pour les munitions
     *
     * @tags AmmunitionHeadType
     * @name AmmunitionHeadTypeControllerCreate
     * @summary Creation
     * @request POST:/api/ammunition-head-type
     * @secure
     */
    ammunitionHeadTypeControllerCreate: (
      data: CreateAmmunitionHeadTypeDto,
      params: RequestParams = {}
    ) =>
      this.request<AmmunitionHeadTypeDto, any>({
        path: `/api/ammunition-head-type`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Edition d un type d ovige
     *
     * @tags AmmunitionHeadType
     * @name AmmunitionHeadTypeControllerEdit
     * @summary Edition
     * @request PUT:/api/ammunition-head-type/{id}
     * @secure
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
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Suppression logique d une ovige
     *
     * @tags AmmunitionHeadType
     * @name AmmunitionHeadTypeControllerDelete
     * @summary Suppresion logique
     * @request DELETE:/api/ammunition-head-type/{id}
     * @secure
     */
    ammunitionHeadTypeControllerDelete: (id: number, params: RequestParams = {}) =>
      this.request<ApiDeleteResponseDto, any>({
        path: `/api/ammunition-head-type/${id}`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Retourne la liste de toutes les douilles disponible
     *
     * @tags AmmunitionBodyType
     * @name AmmunitionBodyTypeControllerFindAllBodyTypes
     * @summary Liste complète
     * @request GET:/api/ammunition-body-type/all
     */
    ammunitionBodyTypeControllerFindAllBodyTypes: (params: RequestParams = {}) =>
      this.request<AmmunitionBodyTypeDto[], any>({
        path: `/api/ammunition-body-type/all`,
        method: 'GET',
        format: 'json',
        ...params
      }),

    /**
     * @description Retourne le detail de la douille
     *
     * @tags AmmunitionBodyType
     * @name AmmunitionBodyTypeControllerFindById
     * @summary Filtré par id
     * @request GET:/api/ammunition-body-type/by/id/{id}
     */
    ammunitionBodyTypeControllerFindById: (id: number, params: RequestParams = {}) =>
      this.request<AmmunitionBodyTypeDto, any>({
        path: `/api/ammunition-body-type/by/id/${id}`,
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
     * @secure
     */
    ammunitionBodyTypeControllerCreate: (
      data: CreateAmmunitionBodyTypeDto,
      params: RequestParams = {}
    ) =>
      this.request<AmmunitionBodyTypeDto, any>({
        path: `/api/ammunition-body-type`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Edition d un type de douille
     *
     * @tags AmmunitionBodyType
     * @name AmmunitionBodyTypeControllerEdit
     * @summary Edition
     * @request PUT:/api/ammunition-body-type/{id}
     * @secure
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
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Suppression logique d une douille
     *
     * @tags AmmunitionBodyType
     * @name AmmunitionBodyTypeControllerDelete
     * @summary Suppresion logique
     * @request DELETE:/api/ammunition-body-type/{id}
     * @secure
     */
    ammunitionBodyTypeControllerDelete: (id: number, params: RequestParams = {}) =>
      this.request<ApiDeleteResponseDto, any>({
        path: `/api/ammunition-body-type/${id}`,
        method: 'DELETE',
        secure: true,
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
     * @description Retourne la liste complete des optiques
     *
     * @tags Optic
     * @name OpticControllerFindAllOptics
     * @summary Liste complète
     * @request GET:/api/optic/all
     */
    opticControllerFindAllOptics: (
      query?: {
        /** Filtre de recherche pour reponse paginé */
        filters?: OpticFilter
      },
      params: RequestParams = {}
    ) =>
      this.request<
        PaginatedResponseDto & {
          data?: OpticDto[]
        },
        any
      >({
        path: `/api/optic/all`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params
      }),

    /**
     * @description Retourne le detail de l optique
     *
     * @tags Optic
     * @name OpticControllerFindById
     * @summary Filtré par id
     * @request GET:/api/optic/by/id/{id}
     */
    opticControllerFindById: (id: number, params: RequestParams = {}) =>
      this.request<OpticDto, any>({
        path: `/api/optic/by/id/${id}`,
        method: 'GET',
        format: 'json',
        ...params
      }),

    /**
     * @description Creer une nouvelle optique et retourne son dto en reponse
     *
     * @tags Optic
     * @name OpticControllerCreate
     * @summary Creation
     * @request POST:/api/optic
     * @secure
     */
    opticControllerCreate: (data: CreateOpticDto, params: RequestParams = {}) =>
      this.request<OpticDto, any>({
        path: `/api/optic`,
        method: 'POST',
        body: data,
        secure: true,
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
     * @secure
     */
    opticControllerEdit: (id: number, data: UpdateOpticDto, params: RequestParams = {}) =>
      this.request<OpticDto, any>({
        path: `/api/optic/${id}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Suppression logique de l optique
     *
     * @tags Optic
     * @name OpticControllerDelete
     * @summary Suppresion logique
     * @request DELETE:/api/optic/{id}
     * @secure
     */
    opticControllerDelete: (id: number, params: RequestParams = {}) =>
      this.request<ApiDeleteResponseDto, any>({
        path: `/api/optic/${id}`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Retourne la liste complete des types d optique
     *
     * @tags OpticType
     * @name OpticTypeControllerFindAll
     * @summary Liste complète
     * @request GET:/api/optic-type/all
     */
    opticTypeControllerFindAll: (params: RequestParams = {}) =>
      this.request<OpticTypeDto[], any>({
        path: `/api/optic-type/all`,
        method: 'GET',
        format: 'json',
        ...params
      }),

    /**
     * @description Ajouter un nouveau type d optique
     *
     * @tags OpticType
     * @name OpticTypeControllerCreate
     * @summary Creation
     * @request POST:/api/optic-type
     * @secure
     */
    opticTypeControllerCreate: (data: CreateOpticTypeDto, params: RequestParams = {}) =>
      this.request<OpticTypeDto, any>({
        path: `/api/optic-type`,
        method: 'POST',
        body: data,
        secure: true,
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
     * @secure
     */
    opticTypeControllerEdit: (id: number, data: OpticTypeDto, params: RequestParams = {}) =>
      this.request<OpticTypeDto, any>({
        path: `/api/optic-type/${id}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Suppression logique un type d optique
     *
     * @tags OpticType
     * @name OpticTypeControllerDelete
     * @summary Suppresion logique
     * @request DELETE:/api/optic-type/{id}
     * @secure
     */
    opticTypeControllerDelete: (id: number, params: RequestParams = {}) =>
      this.request<ApiDeleteResponseDto, any>({
        path: `/api/optic-type/${id}`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Liste complete des colliers d optique
     *
     * @tags Optic-Collar
     * @name OpticCollarControllerFindAll
     * @summary Liste complète
     * @request GET:/api/optic-collar/all
     */
    opticCollarControllerFindAll: (
      query?: {
        /** Filtre de recherche pour reponse paginé */
        filters?: OpticCollarFilter
      },
      params: RequestParams = {}
    ) =>
      this.request<
        PaginatedResponseDto & {
          data?: OpticCollarDto[]
        },
        any
      >({
        path: `/api/optic-collar/all`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params
      }),

    /**
     * @description Retourne le detail du collier optique
     *
     * @tags Optic-Collar
     * @name OpticCollarControllerFindById
     * @summary Filtré par id
     * @request GET:/api/optic-collar/by/id/{id}
     */
    opticCollarControllerFindById: (id: number, params: RequestParams = {}) =>
      this.request<OpticCollarDto, any>({
        path: `/api/optic-collar/by/id/${id}`,
        method: 'GET',
        format: 'json',
        ...params
      }),

    /**
     * @description Creation d un nouveau collier d optique
     *
     * @tags Optic-Collar
     * @name OpticCollarControllerCreate
     * @summary Creation
     * @request POST:/api/optic-collar
     * @secure
     */
    opticCollarControllerCreate: (data: CreateOpticCollarDto, params: RequestParams = {}) =>
      this.request<OpticCollarDto, any>({
        path: `/api/optic-collar`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Edition du collier optique
     *
     * @tags Optic-Collar
     * @name OpticCollarControllerEdit
     * @summary Edition
     * @request PUT:/api/optic-collar/{id}
     * @secure
     */
    opticCollarControllerEdit: (
      id: number,
      data: UpdateOpticCollarDto,
      params: RequestParams = {}
    ) =>
      this.request<OpticCollarDto, any>({
        path: `/api/optic-collar/${id}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Suppression logique du collier optique
     *
     * @tags Optic-Collar
     * @name OpticCollarControllerDelete
     * @summary Suppresion logique
     * @request DELETE:/api/optic-collar/{id}
     * @secure
     */
    opticCollarControllerDelete: (id: number, params: RequestParams = {}) =>
      this.request<ApiDeleteResponseDto, any>({
        path: `/api/optic-collar/${id}`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Retourne la liste complete des plans focal
     *
     * @tags OpticFocalPlane
     * @name OpticFocalPlaneControllerFindAll
     * @summary Liste complète
     * @request GET:/api/optic-focal-plane/all
     */
    opticFocalPlaneControllerFindAll: (params: RequestParams = {}) =>
      this.request<FocalPlaneDto[], any>({
        path: `/api/optic-focal-plane/all`,
        method: 'GET',
        format: 'json',
        ...params
      }),

    /**
     * @description Retourne la liste complete des plans focal
     *
     * @tags OpticUnit
     * @name OpticUnitControllerFindAll
     * @summary Liste complète
     * @request GET:/api/optic-unit/all
     */
    opticUnitControllerFindAll: (params: RequestParams = {}) =>
      this.request<OpticUnitDto[], any>({
        path: `/api/optic-unit/all`,
        method: 'GET',
        format: 'json',
        ...params
      }),

    /**
     * @description Retourne la liste complete des plans focal
     *
     * @tags optic-click
     * @name OpticClickControllerFindAll
     * @summary Liste complète
     * @request GET:/api/optic-click/all
     */
    opticClickControllerFindAll: (params: RequestParams = {}) =>
      this.request<OpticClickValueDto[], any>({
        path: `/api/optic-click/all`,
        method: 'GET',
        format: 'json',
        ...params
      }),

    /**
     * @description Retourne la liste de tous les reducteurs de son disponible
     *
     * @tags Sound-reducer
     * @name SoundReducerControllerFindAll
     * @summary Liste complète
     * @request GET:/api/sound-reducer/all
     */
    soundReducerControllerFindAll: (
      query?: {
        /** Filtre de recherche pour reponse paginé */
        filters?: SoundNoiseFilter
      },
      params: RequestParams = {}
    ) =>
      this.request<
        PaginatedResponseDto & {
          data?: SoundNoiseReducerDto[]
        },
        any
      >({
        path: `/api/sound-reducer/all`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params
      }),

    /**
     * @description Retourne le detail du rds selectionner avec son id
     *
     * @tags Sound-reducer
     * @name SoundReducerControllerFindById
     * @summary Filtré par id
     * @request GET:/api/sound-reducer/by/id/{id}
     */
    soundReducerControllerFindById: (id: number, params: RequestParams = {}) =>
      this.request<SoundNoiseReducerDto, any>({
        path: `/api/sound-reducer/by/id/${id}`,
        method: 'GET',
        format: 'json',
        ...params
      }),

    /**
     * @description Ajout d un nouveau reducteur de son en base de donnee
     *
     * @tags Sound-reducer
     * @name SoundReducerControllerCreate
     * @summary Creation
     * @request POST:/api/sound-reducer
     * @secure
     */
    soundReducerControllerCreate: (data: CreateSoundNoiseReducerDto, params: RequestParams = {}) =>
      this.request<SoundNoiseReducerDto, any>({
        path: `/api/sound-reducer`,
        method: 'POST',
        body: data,
        secure: true,
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
     * @secure
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
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Suppression logique d un reducteur de son
     *
     * @tags Sound-reducer
     * @name SoundReducerControllerDelete
     * @summary Suppresion logique
     * @request DELETE:/api/sound-reducer/{id}
     * @secure
     */
    soundReducerControllerDelete: (id: number, params: RequestParams = {}) =>
      this.request<ApiDeleteResponseDto, any>({
        path: `/api/sound-reducer/${id}`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Retourne la liste de tous les commandes
     *
     * @tags Invoice
     * @name SupplierInvoiceControllerFindAll
     * @summary Liste complète
     * @request GET:/api/supplier-invoice/all
     * @secure
     */
    supplierInvoiceControllerFindAll: (
      query?: {
        /** Filtrer les factures selon leur statut */
        status?: string
      },
      params: RequestParams = {}
    ) =>
      this.request<InvoiceSupplierDto[], any>({
        path: `/api/supplier-invoice/all`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Compte les commandes suivant leur status
     *
     * @tags Invoice
     * @name SupplierInvoiceControllerCountInvoice
     * @summary Compte
     * @request GET:/api/supplier-invoice/count
     * @secure
     */
    supplierInvoiceControllerCountInvoice: (params: RequestParams = {}) =>
      this.request<CountInvoicesDto, any>({
        path: `/api/supplier-invoice/count`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Retourne la commnde fournisseur par son id
     *
     * @tags Invoice
     * @name SupplierInvoiceControllerFindById
     * @summary Filtré par id
     * @request GET:/api/supplier-invoice/by/id/{id}
     * @secure
     */
    supplierInvoiceControllerFindById: (id: number, params: RequestParams = {}) =>
      this.request<InvoiceSupplierDto, any>({
        path: `/api/supplier-invoice/by/id/${id}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Ajout d une nouvelle commande fournisseur
     *
     * @tags Invoice
     * @name SupplierInvoiceControllerCreate
     * @summary Creation
     * @request POST:/api/supplier-invoice
     * @secure
     */
    supplierInvoiceControllerCreate: (data: CreateInvoiceSupplierDto, params: RequestParams = {}) =>
      this.request<InvoiceSupplierDto, any>({
        path: `/api/supplier-invoice`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Passe la commende en archive
     *
     * @tags Invoice
     * @name SupplierInvoiceControllerArchive
     * @summary Creation
     * @request POST:/api/supplier-invoice/archive/{id}
     * @secure
     */
    supplierInvoiceControllerArchive: (id: number, params: RequestParams = {}) =>
      this.request<InvoiceSupplierDto, any>({
        path: `/api/supplier-invoice/archive/${id}`,
        method: 'POST',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Edition d une commande
     *
     * @tags Invoice
     * @name SupplierInvoiceControllerUpdate
     * @summary Edition
     * @request PUT:/api/supplier-invoice/{id}
     * @secure
     */
    supplierInvoiceControllerUpdate: (
      id: number,
      data: UpdateInvoiceSupplierDto,
      params: RequestParams = {}
    ) =>
      this.request<InvoiceSupplierDto, any>({
        path: `/api/supplier-invoice/${id}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Suppresion logique de la commande fournisseur
     *
     * @tags Invoice
     * @name SupplierInvoiceControllerDelete
     * @summary Suppresion logique
     * @request DELETE:/api/supplier-invoice/{id}
     * @secure
     */
    supplierInvoiceControllerDelete: (id: number, params: RequestParams = {}) =>
      this.request<ApiDeleteResponseDto, any>({
        path: `/api/supplier-invoice/${id}`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params
      }),

    /**
     * @description Modification de status de plusieurs elements
     *
     * @tags invoice-item
     * @name InvoiceItemControllerUpdateStatuses
     * @summary Edition
     * @request POST:/api/invoice-item
     * @secure
     */
    invoiceItemControllerUpdateStatuses: (
      data: UpdateBulkItemStatusDto,
      params: RequestParams = {}
    ) =>
      this.request<ItemInvoiceSupplier[], any>({
        path: `/api/invoice-item`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * @description Edition d une commande
     *
     * @tags invoice-item
     * @name InvoiceItemControllerUpdateStatus
     * @summary Edition
     * @request PUT:/api/invoice-item/{id}
     * @secure
     */
    invoiceItemControllerUpdateStatus: (
      id: number,
      data: UpdateItemStatusDto,
      params: RequestParams = {}
    ) =>
      this.request<ItemInvoiceSupplier, any>({
        path: `/api/invoice-item/${id}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params
      })
  }
}
