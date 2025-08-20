import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api'
import { ref } from 'vue'
import { useMutation, useQuery } from '@tanstack/vue-query'
import {
  type CreateWeaponTypeDto,
  type UpdateWeaponTypeDto,
  type WeaponReloadModeDto,
  type WeaponTypeDto
} from '@/api/Api'
import { useFormHandler } from '@/shared/useFormHandler'
import type { AxiosResponse } from 'axios'
import { getI18NPrefix } from '@/enum/I18NSuffix.enum'

export const useWeaponTypeStore = defineStore('weapon-type-store', () => {
  // Appel API
  const { api } = useApiStore()
  // TOAST

  // Refs
  const submitSuccess = ref(false)

  const modes = ref<WeaponReloadModeDto[]>([])
  // Private Attibute
  const _I18N_PREFIX = 'weaponType'
  const _GET_ALL_FN = 'getAllWeaponType'
  const _GET_BY_ID_FN = 'getWeaponTypeById'

  //TODO: A changer ca
  const _PREREQUISITE_FN = 'prerequisite-weaponType'
  // *******************Methodes***************
  const _createMutation = useMutation({
    mutationFn: async (weaponType: CreateWeaponTypeDto) => {
      return await api.api.weaponTypeControllerCreate(weaponType)
    },
    onSuccess() {
      submitSuccess.value = true
    }
  })
  const _updateMutation = useMutation({
    mutationFn: async (factory: UpdateWeaponTypeDto) => {
      return await api.api.weaponTypeControllerEdit(factory.id, factory)
    },
    onSuccess() {
      submitSuccess.value = true
    }
  })
  const _fetchById = async (id?: string) => {
    if (!id) return null
    const res = await api.api.weaponTypeControllerFindById(parseInt(id))
    return res.data
  }
  const getByIdQuery = (id?: string) =>
    useQuery({
      queryKey: [_GET_BY_ID_FN, id],
      queryFn: () => _fetchById(id),
      enabled: !!id,
      retry: 0
    })
  const _fetchAll = async () => {
    const res = await api.api.weaponTypeControllerFindAllWeaponTypes()
    return res.data
  }
  const getAllQuery = () => {
    return useQuery({
      queryKey: [_GET_ALL_FN],
      queryFn: () => _fetchAll(),
      retry: 0
    })
  }

  const queryPrerequisitesWeaponTypeQuery = useQuery({
    queryKey: [_PREREQUISITE_FN],
    queryFn: async () => {
      const res = await api.api.weaponTypeControllerFindPrerequisitesWeaponTypeList()
      modes.value = res.data.modes
      return res
    }
  })
  function useWeaponTypeForm(id?: string) {
    const emptyForm: CreateWeaponTypeDto = {
      name: '',
      reference: '',
      modeId: 0,
      type: null
    }
    return useFormHandler<CreateWeaponTypeDto, AxiosResponse<WeaponTypeDto>>(
      emptyForm,
      getByIdQuery,
      _createMutation,
      _updateMutation,
      _I18N_PREFIX,
      _GET_BY_ID_FN,
      id,
      (data) => ({
        ...data,
        modeId: data.mode.id
      })
    )
  }
  return {
    formBuilder: useWeaponTypeForm,
    getAll: getAllQuery,
    submitSuccess,
    prerequisiteList: queryPrerequisitesWeaponTypeQuery,
    modes$: modes,
    getI18NPrefix: getI18NPrefix(_I18N_PREFIX)
  }
})
