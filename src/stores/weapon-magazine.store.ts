import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api'
import { useToastStore } from '@/stores/toast'
import { useMutation, useQuery } from '@tanstack/vue-query'
import type { CreateWeaponMagazineDto, UpdateWeaponMagazineDto, WeaponMagazineDto } from '@/api/Api'
import { type Ref, ref } from 'vue'
import { useFormHandler } from '@/shared/useFormHandler'
import type { AxiosResponse } from 'axios'
import { getLegalisationCategoryDto } from '@/shared/api-dto/get-legalisation-category.dto'
import { getWeaponTypeDto } from '@/shared/api-dto/get-weapon-type.dto'
import { getCaliberDto } from '@/shared/api-dto/get-caliber.dto'
import { getMaterialDto } from '@/shared/api-dto/get-material.dto'
import { getFactoryDto } from '@/shared/api-dto/get-factory.dto'
import { getPriceHistoryDto } from '@/shared/api-dto/get-price-history.dto'
import { getI18NPrefix, I18NSuffix } from '@/enum/I18NSuffix.enum'

export const useWeaponMagazineStore = defineStore('weapon-magazine-store', () => {
  // Appel API
  const { api } = useApiStore()
  // TOAST
  const { successMessage } = useToastStore()
  // Refs
  const weapons = ref<any>([])
  const magazines = ref<WeaponMagazineDto[]>([])
  const magazine = ref<WeaponMagazineDto>()
  const submitSuccess = ref(false)
  // Private Attibute
  const _I18N_PREFIX = 'magazine'
  const _GET_ALL_BY_CATEGORY_FN = 'getAllMagazineByCategory'
  const _GET_ALL_BY_FACTORY_FN = 'getAllMagazineByFactory'
  const _GET_ALL_FN = 'getAllMagazine'
  const _GET_BY_ID_FN = 'getMagazineById'
  // *******************Methodes***************$
  const _createMutation = useMutation({
    mutationFn: async (magazine: CreateWeaponMagazineDto) => {
      return await api.api.magazineControllerCreate(magazine)
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

  const getAllByCategoryQuery = (categoryId: number) =>
    useQuery({
      queryKey: [_GET_ALL_BY_CATEGORY_FN, categoryId],
      queryFn: async () => {
        return await _fetchAllByCategoryId(categoryId)
      },
      enabled: !!categoryId
    })

  const _fetchAllByCategoryId = async (categoryId: number) => {
    if (!categoryId) return null
    const res = await api.api.magazineControllerFindByCategory(categoryId)
    return res.data
  }

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
      body: getMaterialDto(),
      factory: getFactoryDto(),
      capacity: 0,
      caliber: getCaliberDto(),
      length: 0,
      category: getLegalisationCategoryDto(),
      compatibleHandGun: [],
      compatibleRiffle: [],
      weaponType: getWeaponTypeDto(),
      priceHistory: getPriceHistoryDto(),
      inStock: 0
    }
    return useFormHandler<CreateWeaponMagazineDto, AxiosResponse<WeaponMagazineDto>>(
      emptyForm,
      getByIdQuery,
      _createMutation,
      _updateMutation,
      _I18N_PREFIX,
      _GET_BY_ID_FN,
      undefined,
      id,
      (data) => ({
        ...data,
        compatibleRiffle: data.riffles ? data.riffles : [],
        compatibleHandGun: data.handguns ? data.handguns : []
      })
    )
  }

  const _updateMutation = useMutation({
    mutationFn: async (magazine: UpdateWeaponMagazineDto) => {
      return await api.api.magazineControllerEdit(magazine.id, magazine)
    }
  })

  const _deleteMagazineMutation = useMutation({
    mutationFn: async (id: number) => {
      return await api.api.magazineControllerDelete(id)
    },
    onSuccess() {
      successMessage(
        getI18NPrefix(_I18N_PREFIX) + I18NSuffix.SUMMARY,
        getI18NPrefix(_I18N_PREFIX) + I18NSuffix.DELETED
      )
    }
  })
  const deleteFunction = (id: number) => {
    _deleteMagazineMutation.mutate(id)
  }

  const fetchCompatibleWeapons = async (category: string, type?: string) => {
    if (!type) return null
    // TODO: constantes
    if (type === 'handgun') {
      weapons.value = await _fetchHandgun(category)
    }
    if (type === 'riffle') {
      weapons.value = await _fetchRiffle(category)
    }
  }
  const _fetchRiffle = async (category: string) => {
    const res = await api.api.riffleControllerFindAllByCategory(category)
    return res.data
  }
  const _fetchHandgun = async (category: string) => {
    const res = await api.api.handGunControllerFindAllByCategory(category)
    return res.data
  }

  return {
    getAll: getAllQuery,
    getById: getByIdQuery,
    getByFactoryId: getMagazineByFactory,
    getByCategory: getAllByCategoryQuery,
    magazines$: magazines,
    magazine$: magazine,
    delete: deleteFunction,
    builder: useWeaponForm,
    fetchCompatibleWeapons,
    compatibleWeapons$: weapons,
    getI18NPrefix: getI18NPrefix(_I18N_PREFIX),
    submitSuccess
  }
})
