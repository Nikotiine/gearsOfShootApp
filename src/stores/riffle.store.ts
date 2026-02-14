import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api'
import type { CreateRiffleDto, RiffleDto, RiffleFilter, UpdateRiffleDto } from '@/api/Api'
import { useMutation, useQuery } from '@tanstack/vue-query'
import { useToastStore } from '@/stores/shared/toast'
import { ref } from 'vue'
import { I18NSuffix } from '@/enum/I18NSuffix.enum'
import { getWeaponTypeDto } from '@/shared/api-dto/get-weapon-type.dto'
import { getCaliberDto } from '@/shared/api-dto/get-caliber.dto'
import { getFactoryDto } from '@/shared/api-dto/get-factory.dto'
import { getBarrelTypeDto } from '@/shared/api-dto/get-barrel-type.dto'
import { getLegalisationCategoryDto } from '@/shared/api-dto/get-legalisation-category.dto'
import { getPercussionTypeDto } from '@/shared/api-dto/get-percussion-type.dto'
import { useFormHandler } from '@/shared/useFormHandler'
import type { AxiosResponse } from 'axios'
import { getPriceHistoryDto } from '@/shared/api-dto/get-price-history.dto'
import { buildRiffleFilter } from '@/shared/api-dto/query-filters.builder'
import { I18nPrefix } from '@/i18n/i18n-prefix.enum'

export const useRiffleStore = defineStore('riffle-store', () => {
  // Appel API
  const { api } = useApiStore()
  // TOAST
  const { successMessage } = useToastStore()
  // I18N

  // Refs
  const mutationSuccess = ref(false)
  const queryFilters = ref<RiffleFilter>({ ...buildRiffleFilter() })
  // Private Attibute
  const _I18N_PREFIX = I18nPrefix.RIFFLE
  const _GET_ALL_FN = 'getAllRiffle'
  const _GET_BY_ID_FN = 'getRiffleById'
  // *******************Methodes***************
  const _createMutation = useMutation({
    mutationFn: async (riffle: CreateRiffleDto) => {
      return await api.api.riffleControllerCreate(riffle)
    },
    onSuccess() {
      mutationSuccess.value = true
    }
  })

  const _updateMutation = useMutation({
    mutationFn: async (riffle: UpdateRiffleDto) => {
      return await api.api.riffleControllerUpdate(riffle.id, riffle)
    },
    onSuccess() {
      mutationSuccess.value = true
    }
  })

  const getAllRiffleQuery = () =>
    useQuery({
      queryKey: [_GET_ALL_FN, queryFilters],
      queryFn: async () => {
        return await _fetchAll(queryFilters.value)
      },
      enabled: !!queryFilters.value,
      retry: 0,
      placeholderData: (old) => old
    })

  const _fetchAll = async (filters: RiffleFilter) => {
    if (!filters) return null
    const res = await api.api.riffleControllerFindAll({ filters })
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
    const res = await api.api.riffleControllerFindById(parseInt(id))
    return res.data
  }

  const _deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      return await api.api.riffleControllerDelete(id)
    },
    onSuccess() {
      successMessage(_I18N_PREFIX + I18NSuffix.SUMMARY, _I18N_PREFIX + I18NSuffix.DELETED)
    }
  })
  const deleteFunction = (id: number) => {
    _deleteMutation.mutate(id)
  }

  function useRiffleForm(id?: string) {
    const emptyForm: CreateRiffleDto = {
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
      adjustableTriggerMaxWeight: 0,
      adjustableTriggerMinWeight: 0,
      description: '',
      category: getLegalisationCategoryDto(),
      percussionType: getPercussionTypeDto(),
      providedMagazineQuantity: 0,
      barrelSize: 0,
      buttMaterial: null,
      barrelColor: null,
      buttColor: null,
      grenadierSlot: 0,
      isAdjustableBackSight: false,
      isAdjustableBusk: false,
      isAdjustableButt: false,
      isAdjustableFrontSight: false,
      isMlockCompatibility: false,
      isOpenAim: true,
      mLockOptions: null,
      qcSlot: 0,
      railSize: null,
      priceHistory: getPriceHistoryDto(),
      inStock: 0
    }
    return useFormHandler<CreateRiffleDto, AxiosResponse<RiffleDto>>(
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
    delete: deleteFunction,
    getRiffleById: getByIdQuery,
    getAll: getAllRiffleQuery,
    getI18NPrefix: _I18N_PREFIX,
    formBuilder: useRiffleForm,
    queryFilters$: queryFilters
  }
})
