import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api'
import { useToastStore } from '@/stores/shared/toast'
import { useMutation, useQuery } from '@tanstack/vue-query'
import type { CreateHandGunDto, HandGunDto, HandGunFilter, UpdateHandGunDto } from '@/api/Api'
import { ref } from 'vue'
import { I18NSuffix } from '@/enum/I18NSuffix.enum'
import { useFormHandler } from '@/shared/useFormHandler'
import type { AxiosResponse } from 'axios'
import { getWeaponTypeDto } from '@/shared/api-dto/get-weapon-type.dto'
import { getCaliberDto } from '@/shared/api-dto/get-caliber.dto'
import { getFactoryDto } from '@/shared/api-dto/get-factory.dto'
import { getLegalisationCategoryDto } from '@/shared/api-dto/get-legalisation-category.dto'
import { getBarrelTypeDto } from '@/shared/api-dto/get-barrel-type.dto'
import { getPercussionTypeDto } from '@/shared/api-dto/get-percussion-type.dto'
import { getTriggerTypeDto } from '@/shared/api-dto/get-trigger-type.dto'
import { getPriceHistoryDto } from '@/shared/api-dto/get-price-history.dto'
import { buildHandGunFilter } from '@/shared/api-dto/query-filters.builder'
import { I18nPrefix } from '@/i18n/i18n-prefix.enum'

export const useHandGunStore = defineStore('hand-gun-store', () => {
  // Appel API
  const { api } = useApiStore()

  // TOAST
  const { successMessage } = useToastStore()

  // Refs
  const mutationSuccess = ref(false)
  const queryFilters = ref<HandGunFilter>({ ...buildHandGunFilter() })
  // Private Attibute
  const _I18N_PREFIX = I18nPrefix.HANDGUN
  const _GET_ALL_FN = 'getAllHandGun'
  const _GET_BY_ID_FN = 'getHandGunById'
  // *******************Methodes***************
  const _createMutation = useMutation({
    mutationFn: async (handgun: CreateHandGunDto) => {
      return await api.api.handGunControllerCreate(handgun)
    },
    onSuccess() {
      mutationSuccess.value = true
    }
  })

  const _updateMutation = useMutation({
    mutationFn: async (handgun: UpdateHandGunDto) => {
      return await api.api.handGunControllerUpdate(handgun.id, handgun)
    },
    onSuccess() {
      mutationSuccess.value = true
    }
  })

  const getAllHandgunQuery = () =>
    useQuery({
      queryKey: [_GET_ALL_FN, queryFilters],
      queryFn: async () => {
        return _fetchAll(queryFilters.value)
      },
      enabled: !!queryFilters.value,
      retry: 0,
      placeholderData: (old) => old
    })

  const _fetchAll = async (filters: HandGunFilter) => {
    if (!filters) return null
    const res = await api.api.handGunControllerFindAll({ filters })
    return res.data
  }

  const getByIdQuery = (id?: string) =>
    useQuery({
      queryKey: [_GET_BY_ID_FN, id],
      queryFn: async () => _fetchById(id),
      enabled: !!id,
      retry: 0
    })

  const _fetchById = async (id?: string): Promise<HandGunDto | null> => {
    if (!id) {
      return null
    }
    const res = await api.api.handGunControllerFindById(parseInt(id))
    return res.data
  }

  const _deleteMutation = useMutation({
    mutationFn: async (opticId: number) => {
      return await api.api.handGunControllerDelete(opticId)
    },
    onSuccess() {
      successMessage(_I18N_PREFIX + I18NSuffix.SUMMARY, _I18N_PREFIX + I18NSuffix.DELETED)
    }
  })

  const deleteFunction = (id: number) => {
    _deleteMutation.mutate(id)
  }
  function useHandGunForm(id?: string) {
    const emptyForm: CreateHandGunDto = {
      type: getWeaponTypeDto(),
      caliber: getCaliberDto(),
      factory: getFactoryDto(),
      name: '',
      variation: '',
      barrelType: getBarrelTypeDto(),
      isThreadedBarrel: false,
      barrelLength: 0,
      threadedSize: null,
      isAdjustableTrigger: false,
      adjustableTriggerMaxWeight: null,
      adjustableTriggerMinWeight: null,
      description: '',
      category: getLegalisationCategoryDto(),
      percussionType: getPercussionTypeDto(),
      providedMagazineQuantity: 0,
      barrelSize: 0,
      buttMaterial: null,
      barrelColor: null,
      buttColor: null,
      decocking: true,
      isPicatinyRailSlop: false,
      isAdjustableBackSight: true,
      isAdjustableFrontSight: true,
      providedOpticReadyPlates: [],
      isOpticReady: false,
      isExternalHammer: false,
      slideMaterial: null,
      slideColor: null,
      triggerType: getTriggerTypeDto(),
      priceHistory: getPriceHistoryDto(),
      inStock: 0
    }

    return useFormHandler<CreateHandGunDto, AxiosResponse<HandGunDto>>(
      emptyForm,
      getByIdQuery,
      _createMutation,
      _updateMutation,
      _I18N_PREFIX,
      _GET_BY_ID_FN,
      undefined,
      id,
      (data) => ({
        ...data
      })
    )
  }

  return {
    formBuilder: useHandGunForm,
    delete: deleteFunction,
    getHandGunById: getByIdQuery,
    getAll: getAllHandgunQuery,
    getI18NPrefix: _I18N_PREFIX,
    queryFilters$: queryFilters
  }
})
