import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api'
import { useQuery } from '@tanstack/vue-query'
import type {
  CaliberDto,
  ColorDto,
  FactoryDto,
  LegislationCategoryDto,
  MaterialDto,
  MLockOptionDto,
  OpticReadyPlateDto,
  PercussionTypeDto,
  RailSizeDto,
  ThreadedSizeDto,
  WeaponBarrelTypeDto,
  WeaponMagazineDto,
  WeaponTriggerTypeDto,
  WeaponTypeDto
} from '@/api/Api'

import { ref } from 'vue'

export const useWeaponStore = defineStore('weapon', () => {
  const { api } = useApiStore()
  const categories = ref<LegislationCategoryDto[]>([])
  const weaponTypes = ref<WeaponTypeDto[]>([])
  const railSizes = ref<RailSizeDto[]>([])
  const materials = ref<MaterialDto[]>([])
  const colors = ref<ColorDto[]>([])
  const triggerTypes = ref<WeaponTriggerTypeDto[]>([])
  const opticReadyPlates = ref<OpticReadyPlateDto[]>([])

  const queryPrerequisitesWeaponList = useQuery({
    queryKey: ['prerequisite-weapon'],
    queryFn: async () => {
      const res = await api.api.weaponControllerFindPrerequisitesWeaponList()
      categories.value = res.data.categories
      weaponTypes.value = res.data.types
      railSizes.value = res.data.railSizes
      materials.value = res.data.buttTypes
      colors.value = res.data.colors
      triggerTypes.value = res.data.triggerTypes
      opticReadyPlates.value = res.data.opticReadyPlates
      return res
    }
  })

  return {
    prerequisitesWeaponList: queryPrerequisitesWeaponList,
    categories$: categories,
    weaponTypes$: weaponTypes,
    railSizes$: railSizes,
    materials$: materials,
    colors$: colors,
    triggerTypes$: triggerTypes,
    opticReadyPlates$: opticReadyPlates
  }
})
export interface NewWeapon {
  type: number
  category: number
}
export interface WeaponViewModel {
  id: number
  reference: string
  name: string
  description: string
  variation: string | null
  category: LegislationCategoryDto
  caliber: CaliberDto
  factory: FactoryDto
  type: WeaponTypeDto
  barrelLength: number
  isAdjustableTrigger: boolean
  isThreadedBarrel: boolean
  barrelType: WeaponBarrelTypeDto
  threadedSize: ThreadedSizeDto
  adjustableTriggerValue: string
  percussionType: PercussionTypeDto
  providedMagazineQuantity: number
  providedMagazine: WeaponMagazineDto
  barrelSize: number
  buttMaterial: MaterialDto
  isAdjustableFrontSight: boolean
  isAdjustableBackSight: boolean
  buttColor: ColorDto
  barrelColor: ColorDto
  isAdjustableButt?: boolean
  isAdjustableBusk?: boolean
  railSize?: RailSizeDto
  grenadierSlot?: number
  qcSlot?: number
  isMlockCompatibility?: boolean
  isOpenAim?: boolean
  mLockOptions?: MLockOptionDto[] | null
  isOpticReady?: boolean
  decocking?: boolean
  triggerType?: WeaponTriggerTypeDto
  slideColor?: ColorDto
  slideMaterial?: MaterialDto
  isExternalHammer?: boolean
  opticReadyPlates?: OpticReadyPlateDto[]
  isPicatinyRailSlop?: boolean
}
