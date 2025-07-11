import { defineStore } from 'pinia'
import {
  type CaliberDto,
  type ColorDto,
  type FactoryDto,
  type LegislationCategoryDto,
  type MaterialDto,
  type MLockOptionDto,
  type OpticReadyPlateDto,
  type PercussionTypeDto,
  type RailSizeDto,
  type ThreadedSizeDto,
  type WeaponBarrelTypeDto,
  type WeaponTriggerTypeDto,
  type WeaponTypeDto,
  WeaponTypeDtoTypeEnum
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
      },
      type: WeaponTypeDtoTypeEnum.Riffle
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
