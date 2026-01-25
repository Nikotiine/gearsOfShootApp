import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api'
import { useToastStore } from '@/stores/toast'
import { useMutation, useQuery } from '@tanstack/vue-query'
import type {
  CreateOpticDto,
  FocalPlaneDto,
  OpticDto,
  OpticFilter,
  OpticTypeDto,
  OpticUnitDto,
  UpdateOpticDto
} from '@/api/Api'
import { ref } from 'vue'
import { AdminRouterEnum } from '@/enum/router/admin-router.enum'
import { useRouter } from 'vue-router'
import { useFormHandler } from '@/shared/useFormHandler'
import type { AxiosResponse } from 'axios'
import { getFactoryDto } from '@/shared/api-dto/get-factory.dto'
import { getFocalPlaneDto } from '@/shared/api-dto/get-focal-plane.dto'
import { getOpticUnitDto } from '@/shared/api-dto/get-optic-unit.dto'
import { getOpticTypeDto } from '@/shared/api-dto/get-optic-type.dto'
import { getPriceHistoryDto } from '@/shared/api-dto/get-price-history.dto'
import { I18NSuffix } from '@/enum/I18NSuffix.enum'
import { buildOpticFilter } from '@/shared/api-dto/query-filters.builder'
import { I18nPrefix } from '@/i18n/i18n-prefix.enum'

export const useOpticStore = defineStore('optic-store', () => {
  // Appel API
  const { api } = useApiStore()
  // TOAST
  const { successMessage } = useToastStore()

  // Router
  const { push } = useRouter()
  // Refs
  const opticUnits = ref<OpticUnitDto[]>([])
  const opticType = ref<OpticTypeDto[]>([])
  const focalPlanes = ref<FocalPlaneDto[]>([])
  const queryFilters = ref<OpticFilter>({ ...buildOpticFilter() })
  // Private Attibute
  const _I18N_PREFIX = I18nPrefix.OPTIC

  const _GET_ALL_FN = 'getAllOptic'
  const _GET_BY_ID_FN = 'getOpticById'

  // *******************Methodes***************

  const getAllOpticsQuery = () =>
    useQuery({
      queryKey: [_GET_ALL_FN, queryFilters],
      queryFn: async () => {
        return await _fetchAllOptics(queryFilters.value)
      },
      enabled: !!queryFilters.value,
      placeholderData: (old) => old
    })

  const _fetchAllOptics = async (filters: OpticFilter) => {
    if (!filters) return null
    const res = await api.api.opticControllerFindAllOptics({ filters })
    return res.data
  }

  const _createMutation = useMutation({
    mutationFn: async (optic: CreateOpticDto) => {
      return await api.api.opticControllerCreate(optic)
    }
  })

  const _updateMutation = useMutation({
    mutationFn: async (optic: UpdateOpticDto) => {
      return await api.api.opticControllerEdit(optic.id, optic)
    },
    onSuccess() {
      push({ name: AdminRouterEnum.OPTIC_LIST })
    }
  })

  const _deleteMutation = useMutation({
    mutationFn: async (opticId: number) => {
      return await api.api.opticControllerDelete(opticId)
    },
    onSuccess() {
      successMessage(_I18N_PREFIX + I18NSuffix.SUMMARY, _I18N_PREFIX + I18NSuffix.DELETED)
    }
  })

  const deleteFunction = (id: number) => {
    _deleteMutation.mutate(id)
  }

  const _fetchById = async (id?: string) => {
    if (!id) return null
    const res = await api.api.opticControllerFindById(parseInt(id))
    return res.data
  }

  const getByIdQuery = (id?: string) =>
    useQuery({
      queryKey: [_GET_BY_ID_FN, id],
      queryFn: () => _fetchById(id),
      enabled: !!id,
      retry: 0
    })

  function useOpticForm(id?: string) {
    const emptyForm: CreateOpticDto = {
      name: '',
      bodyDiameter: 0,
      description: '',
      factory: getFactoryDto(),
      maxDrift: 0,
      maxElevation: 0,
      isParallax: false,
      minZoom: 0,
      maxZoom: 0,
      minParallax: 0,
      maxParallax: 0,
      lensDiameter: 0,
      clickValue: {
        id: 0,
        name: '',
        opticUnit: getOpticUnitDto()
      },
      focalPlane: getFocalPlaneDto(),
      opticUnit: getOpticUnitDto(),
      opticType: getOpticTypeDto(),
      eyeRelief: 0,
      isCollarsProvided: false,
      length: 0,
      priceHistory: getPriceHistoryDto(),
      providedOpticCollarSize: null,
      inStock: 0
    }
    return useFormHandler<CreateOpticDto, AxiosResponse<OpticDto>>(
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
    units$: opticUnits,
    types$: opticType,
    focalPlanes$: focalPlanes,
    getAll: getAllOpticsQuery,
    getById: getByIdQuery,
    formBuilder: useOpticForm,
    getI18NPrefix: _I18N_PREFIX,
    queryFilter$: queryFilters
  }
})
