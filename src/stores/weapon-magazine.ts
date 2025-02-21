import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api'
import { useToastStore } from '@/stores/toast'
import { useMutation, useQuery } from '@tanstack/vue-query'
import type {
  CreateWeaponMagazineDto,
  FactoryDto,
  UpdateWeaponMagazineDto,
  WeaponMagazineDto
} from '@/api/Api'
import { type Ref, ref } from 'vue'

export const useWeaponMagazineStore = defineStore('weaponMagazine', () => {
  const { api } = useApiStore()
  const { successMessage } = useToastStore()

  const magazines = ref<WeaponMagazineDto[]>([])

  const createWeaponMagazineMutation = useMutation({
    mutationFn: async (magazine: CreateWeaponMagazineDto) => {
      return await api.api.magazineControllerCreate(magazine)
    },
    onSuccess(data) {
      magazines.value.push(data.data)
      successMessage('magazine.summary', 'magazine.form.success')
    }
  })

  const getMagazineByFactory = (factoryName: Ref<string>) =>
    useQuery({
      queryKey: ['getMagazineByFactory', factoryName.value],
      queryFn: async () => {
        const res = await api.api.magazineControllerFindByFactory(factoryName.value)
        magazines.value = res.data
        return res
      },
      enabled: !!factoryName.value
    })

  const getAllQuery = (enbaled: Ref<boolean>) =>
    useQuery({
      queryKey: ['getAllMagazine'],
      queryFn: async () => {
        const res = await api.api.magazineControllerFindAll()
        magazines.value = res.data
        return res
      },
      enabled: () => enbaled.value
    })

  const getAllByCategoryQuery = (category: Ref<string>) =>
    useQuery({
      queryKey: ['getAllByCategoryQuery', category.value],
      queryFn: async () => {
        const res = await api.api.magazineControllerFindByCategory(category.value)
        magazines.value = res.data
        console.log(magazines.value)
        return res
      },
      enabled: !!category.value
    })

  const getByIdQuery = (id: Ref<number>) =>
    useQuery({
      queryKey: ['getById', id.value],
      queryFn: async () => {
        const res = await api.api.magazineControllerFindById(id.value)
        return res
      },
      enabled: !!id.value
    })

  const updateMAgazineMutation = useMutation({
    mutationFn: async (magazine: UpdateWeaponMagazineDto) => {
      return await api.api.magazineControllerEdit(magazine.id, magazine)
    },
    onSuccess(data) {
      magazines.value.push(data.data)
      successMessage('magazine.summary', 'magazine.form.success')
    }
  })

  return {
    getAll: getAllQuery,
    getById: getByIdQuery,
    create: createWeaponMagazineMutation,
    getByFactoryId: getMagazineByFactory,
    getByCategory: getAllByCategoryQuery,
    magazines$: magazines,
    edit: updateMAgazineMutation
  }
})
