import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api'
import { useQuery } from '@tanstack/vue-query'
import type {
  ColorDto,
  LegislationCategoryDto,
  MaterialDto,
  OpticReadyPlateDto,
  RailSizeDto,
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
export type FocusField =
  | 'caliber'
  | 'factory'
  | 'percussion'
  | 'barrel'
  | 'barrelLength'
  | 'buttMaterial'
  | 'buttColor'
  | 'opticRail'
  | 'threadSize'
  | 'name'
export type DrawerWeaponForm =
  | 'caliber'
  | 'factory'
  | 'buttMaterial'
  | 'buttColor'
  | 'opticRail'
  | 'threadSize'
