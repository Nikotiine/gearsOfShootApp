import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api'
import { useToastStore } from '@/stores/toast'
import { useMutation, useQuery } from '@tanstack/vue-query'
import type { CreateWeaponMagazineDto, UpdateWeaponMagazineDto, WeaponMagazineDto } from '@/api/Api'
import { type Ref, ref } from 'vue'

export const useWeaponMagazineStore = defineStore('weaponMagazine', () => {
  // Appel API
  const { api } = useApiStore()
  // TOAST
  const { successMessage } = useToastStore()
  // Refs
  const magazines = ref<WeaponMagazineDto[]>([])
  const magazine = ref<WeaponMagazineDto>()
  // Private Attibute
  const _SUMMARY = 'magazine.summary'
  const _GET_ALL_BY_CATEGORY_FN = 'getAllMagazineByCategory'
  const _GET_ALL_BY_FACTORY_FN = 'getAllMagazineByFactory'
  const _GET_ALL_FN = 'getAllMagazine'
  const _GET_BY_ID_FN = 'getMagazineById'
  // *******************Methodes***************$
  const createWeaponMagazineMutation = useMutation({
    mutationFn: async (magazine: CreateWeaponMagazineDto) => {
      return await api.api.magazineControllerCreate(magazine)
    },
    onSuccess(data) {
      magazines.value.push(data.data)
      successMessage(_SUMMARY, 'magazine.form.success')
    }
  })

  const getMagazineByFactory = (factoryName: Ref<string>) =>
    useQuery({
      queryKey: [_GET_ALL_BY_FACTORY_FN, factoryName.value],
      queryFn: async () => {
        const res = await api.api.magazineControllerFindByFactory(factoryName.value)
        magazines.value = res.data
        return res
      },
      enabled: !!factoryName.value
    })

  const getAllQuery = (enabled: Ref<boolean>) =>
    useQuery({
      queryKey: [_GET_ALL_FN],
      queryFn: async () => {
        const res = await api.api.magazineControllerFindAll()
        magazines.value = res.data
        return res
      },
      enabled: () => enabled.value
    })

  const getAllByCategoryQuery = (category: Ref<string>) =>
    useQuery({
      queryKey: [_GET_ALL_BY_CATEGORY_FN, category.value],
      queryFn: async () => {
        const res = await api.api.magazineControllerFindByCategory(category.value)
        magazines.value = res.data
        return res
      },
      enabled: !!category.value
    })

  const getByIdQuery = (id: Ref<number>) =>
    useQuery({
      queryKey: [_GET_BY_ID_FN, id.value],
      queryFn: async () => {
        const res = await api.api.magazineControllerFindById(id.value)
        magazine.value = res.data
        return res
      },
      enabled: !!id.value
    })

  const updateMagazineMutation = useMutation({
    mutationFn: async (magazine: UpdateWeaponMagazineDto) => {
      return await api.api.magazineControllerEdit(magazine.id, magazine)
    },
    onSuccess(data) {
      magazines.value.push(data.data)
      successMessage(_SUMMARY, 'magazine.form.success')
    }
  })

  const _deleteMagazineMutation = useMutation({
    mutationFn: async (id: number) => {
      return await api.api.magazineControllerDelete(id)
    },
    onSuccess(data) {
      successMessage(_SUMMARY, data.data.message)
    }
  })
  const deleteFunction = (id: number) => {
    _deleteMagazineMutation.mutate(id)
  }
  return {
    getAll: getAllQuery,
    getById: getByIdQuery,
    create: createWeaponMagazineMutation,
    getByFactoryId: getMagazineByFactory,
    getByCategory: getAllByCategoryQuery,
    magazines$: magazines,
    magazine$: magazine,
    edit: updateMagazineMutation,
    delete: deleteFunction
  }
})
