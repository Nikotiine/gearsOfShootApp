import { defineStore } from 'pinia'
import { type LegislationCategoryDto, type WeaponTypeDto, WeaponTypeDtoTypeEnum } from '@/api/Api'

import { ref } from 'vue'
//TODO: Supprimer ce store
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
