import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api'
import { useMutation, useQuery } from '@tanstack/vue-query'
import type {
  CreateWeaponDto,
  LegislationCategoryDto,
  RailSizeDto,
  WeaponButtTypeDto,
  WeaponDto,
  WeaponTypeDto
} from '@/api/Api'
import { useToastStore } from '@/stores/toast'
import { computed, ref } from 'vue'

export const useWeaponStore = defineStore('weapon', () => {
  const { api } = useApiStore()
  const { successMessage } = useToastStore()
  const categoryId = ref<number>(0)
  const weaponId = ref<number>(0)
  const selectedWeaponDetail = ref<WeaponDto>()
  const categories = ref<LegislationCategoryDto[]>([])
  const weaponTypes = ref<WeaponTypeDto[]>([])
  const railSizes = ref<RailSizeDto[]>([])
  const buttTypes = ref<WeaponButtTypeDto[]>([])
  const findByIdRequestIsEnabled = computed(() => weaponId.value > 0)

  const queryPrerequisitesWeaponList = useQuery({
    queryKey: ['prerequisite-weapon'],
    queryFn: async () => {
      const res = await api.api.weaponControllerFindPrerequisitesWeaponList()
      categories.value = res.data.categories
      weaponTypes.value = res.data.types
      railSizes.value = res.data.railSizes
      buttTypes.value = res.data.buttTypes
      return res
    }
  })
  const queryFindAllWeaponByCategory = useQuery({
    queryKey: ['weaponsByCategory', categoryId],
    queryFn: async () => {
      const res = await api.api.weaponControllerFindAllByCategory(categoryId.value)

      return res
    },
    staleTime: 10000
  })

  const createWeaponMutation = useMutation({
    mutationFn: async (weapon: CreateWeaponDto) => {
      return await api.api.weaponControllerCreate(weapon)
    },
    onSuccess(data) {
      successMessage('weapon.summary', 'weapon.add.success')
    }
  })

  function setCategoryId(name: string): void {
    const category = categories.value.find((c) => c.name === name)
    categoryId.value = category?.id || 0
  }

  function setWeaponId(id: number): void {
    weaponId.value = id
  }

  const findByIdQuery = useQuery({
    queryKey: ['get-weapon-by-id', weaponId.value],
    queryFn: async () => {
      const res = await api.api.weaponControllerFindById(weaponId.value)
      selectedWeaponDetail.value = res.data
      return res
    },
    enabled: findByIdRequestIsEnabled
  })

  return {
    prerequisitesWeaponList: queryPrerequisitesWeaponList,
    create: createWeaponMutation,
    getWeaponsByCategoryQuery: queryFindAllWeaponByCategory,
    setCategory: setCategoryId,
    categories$: categories,
    findById: findByIdQuery,
    setWeaponId: setWeaponId,
    weaponTypes$: weaponTypes,
    railSizes$: railSizes,
    buttTypes$: buttTypes
  }
})
