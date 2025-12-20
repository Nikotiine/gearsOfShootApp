import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api'
import { useToastStore } from '@/stores/toast'
import { useMutation, useQuery } from '@tanstack/vue-query'
import type {
  CreateOpticCollarDto,
  OpticCollarDto,
  OpticCollarFilter,
  UpdateOpticCollarDto
} from '@/api/Api'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { RouterEnum } from '@/enum/router.enum'
import { useFormHandler } from '@/shared/useFormHandler'
import type { AxiosResponse } from 'axios'
import { getFactoryDto } from '@/shared/api-dto/get-factory.dto'
import { getOpticRailSizeDto } from '@/shared/api-dto/get-optic-rail-size.dto'
import { getPriceHistoryDto } from '@/shared/api-dto/get-price-history.dto'
import { getI18NPrefix, I18NSuffix } from '@/enum/I18NSuffix.enum'
import { buildOpticCollarFilter } from '@/shared/api-dto/query-filters.builder'

export const useOpticCollarStore = defineStore('optic-collar-store', () => {
  // Appel API
  const { api } = useApiStore()
  // TOAST
  const { successMessage } = useToastStore()
  // Router
  const { push } = useRouter()
  // Refs
  const collars = ref<OpticCollarDto[]>([])
  const collar = ref<OpticCollarDto>()
  const queryFilters = ref<OpticCollarFilter>({ ...buildOpticCollarFilter() })
  // Private Attibute
  const _I18N_PREFIX = 'opticCollar'
  const _GET_ALL_FN = 'getAllOpticCollar'
  const _GET_BY_ID_FN = 'getOpticCollarById'

  // *******************Methodes***************
  const _createMutation = useMutation({
    mutationFn: async (optic: CreateOpticCollarDto) => {
      return await api.api.opticCollarControllerCreate(optic)
    }
  })

  const _updateMutation = useMutation({
    mutationFn: async (collar: UpdateOpticCollarDto) => {
      return await api.api.opticCollarControllerEdit(collar.id, collar)
    },
    onSuccess: () => {
      push({ name: RouterEnum.OPTIC_COLLAR_LIST })
    }
  })

  const getAllQuery = () =>
    useQuery({
      queryKey: [_GET_ALL_FN, queryFilters],
      queryFn: async () => {
        return await _fetchAll(queryFilters.value)
      },
      enabled: !!queryFilters.value,
      placeholderData: (old) => old
    })

  const _fetchAll = async (filters: OpticCollarFilter) => {
    if (!filters) return null
    const res = await api.api.opticCollarControllerFindAll({ filters })
    return res.data
  }

  const _deleteMutation = useMutation({
    mutationFn: async (collarId: number) => {
      return await api.api.opticCollarControllerDelete(collarId)
    },
    onSuccess() {
      successMessage(
        getI18NPrefix(_I18N_PREFIX) + I18NSuffix.SUMMARY,
        getI18NPrefix(_I18N_PREFIX) + I18NSuffix.DELETED
      )
    }
  })

  const deleteFunction = (id: number) => {
    _deleteMutation.mutate(id)
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
    const res = await api.api.opticCollarControllerFindById(parseInt(id))
    return res.data
  }

  function useOpticCollarForm(id?: string) {
    const emptyForm: CreateOpticCollarDto = {
      diameter: 0,
      factory: getFactoryDto(),
      height: 0,
      name: '',
      railSize: getOpticRailSizeDto(),
      description: '',
      priceHistory: getPriceHistoryDto(),
      inStock: 0
    }
    return useFormHandler<CreateOpticCollarDto, AxiosResponse<OpticCollarDto>>(
      emptyForm,
      getByIdQuery,
      _createMutation,
      _updateMutation,
      _I18N_PREFIX,
      _GET_BY_ID_FN,
      _GET_ALL_FN,
      id,
      (data) => ({
        ...data
      })
    )
  }
  return {
    collars$: collars,
    getAll: getAllQuery,
    getById: getByIdQuery,
    delete: deleteFunction,
    collar$: collar,
    formBuilder: useOpticCollarForm,
    getI18NPrefix: getI18NPrefix(_I18N_PREFIX),
    queryFilters$: queryFilters
  }
})
