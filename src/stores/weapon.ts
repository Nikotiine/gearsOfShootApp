import { defineStore } from 'pinia'
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
  WeaponTriggerTypeDto,
  WeaponTypeDto
} from '@/api/Api'

import { ref } from 'vue'

export const useWeaponStore = defineStore('weapon', () => {
  const initialOptions: NewWeapon = {
    type: {
      id: 0,
      name: '',
      reference: '',
      mode: {
        id: 0,
        name: ''
      }
    },
    category: {
      id: 0,
      name: ''
    }
  }
  const options = ref<NewWeapon>({ ...initialOptions })
  const resetOptions = () => {
    options.value = { ...initialOptions }
  }
  const setOptions = (data: NewWeapon) => {
    options.value = { ...data }
  }
  return {
    resetOptions,
    options,
    setOptions
  }
})
export interface NewWeapon {
  type: WeaponTypeDto
  category: LegislationCategoryDto
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

  percussionType: PercussionTypeDto
  providedMagazineQuantity: number
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
  adjustableTriggerMaxWeight?: number
  adjustableTriggerMinWeight?: number
}
