import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api'
import { useToastStore } from '@/stores/toast'
import { useMutation, useQuery } from '@tanstack/vue-query'
import type { CreateWeaponMagazineDto, UpdateWeaponMagazineDto, WeaponMagazineDto } from '@/api/Api'
import { type Ref, ref, watch } from 'vue'

export const useWeaponMagazineStore = defineStore('weaponMagazine', () => {
  // Appel API
  const { api } = useApiStore()
  // TOAST
  const { successMessage } = useToastStore()
  // Refs
  const magazines = ref<WeaponMagazineDto[]>([])
  const magazine = ref<WeaponMagazineDto>()
  // Private Attibute
  const I18N_PREFIX = 'magazine'
  const _SUMMARY = I18N_PREFIX + '.summary'
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
      successMessage(_SUMMARY, I18N_PREFIX + '.success')
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

  const getByIdQuery = (id?: string) =>
    useQuery({
      queryKey: [_GET_BY_ID_FN, id],
      queryFn: () => _fetchById(id),
      enabled: !!id,
      retry: 0
    })

  const _fetchById = async (id?: string) => {
    if (!id) return null
    const res = await api.api.magazineControllerFindById(parseInt(id))
    return res.data
  }

  function useWeaponForm(id?: string) {
    const emptyForm: CreateWeaponMagazineDto = {
      description: '',
      width: 0,
      height: 0,
      bodyId: 0,
      factoryId: 0,
      capacity: 0,
      caliberId: 0,
      length: 0,
      categoryId: 0,
      compatibleHandGun: [],
      compatibleRiffle: [],
      weaponTypeId: 0
    }
    const form = ref<CreateWeaponMagazineDto>({ ...emptyForm })
    const resetForm = () => {
      form.value = emptyForm
    }
    const { data, isSuccess } = getByIdQuery(id)
    watch(
      () => data.value,
      (newData) => {
        if (isSuccess.value && newData) {
          form.value = {
            ...newData,
            factoryId: newData.factory.id,
            caliberId: newData.caliber.id,
            categoryId: newData.category.id,
            weaponTypeId: newData.forWeaponType.id,
            bodyId: newData.body.id,
            compatibleRiffle: newData.riffles ? newData.riffles : [],
            compatibleHandGun: newData.handguns ? newData.handguns : []
          }
        }
      },
      { immediate: true }
    )
    return { form, isSuccess, resetForm }
  }

  const updateMagazineMutation = useMutation({
    mutationFn: async (magazine: UpdateWeaponMagazineDto) => {
      return await api.api.magazineControllerEdit(magazine.id, magazine)
    },
    onSuccess(data) {
      magazines.value.push(data.data)
      successMessage(_SUMMARY, I18N_PREFIX + '.updated')
    }
  })

  const _deleteMagazineMutation = useMutation({
    mutationFn: async (id: number) => {
      return await api.api.magazineControllerDelete(id)
    },
    onSuccess(data) {
      if (data.data.isSuccess) {
        const index = magazines.value.findIndex((magazine) => magazine.id === data.data.id)
        magazines.value.splice(index, 1)
        successMessage(_SUMMARY, I18N_PREFIX + '.deleted')
      }
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
    delete: deleteFunction,
    builder: useWeaponForm
  }
})
