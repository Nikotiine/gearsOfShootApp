import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api'
import { useToastStore } from '@/stores/toast'
import { useMutation, useQuery } from '@tanstack/vue-query'
import type {
  AmmunitionDto,
  CreateAmmunitionDto,
  PaginatedResponseDto,
  UpdateAmmunitionDto
} from '@/api/Api'
import { ref } from 'vue'
import { useFormHandler } from '@/shared/useFormHandler'
import type { AxiosResponse } from 'axios'
import { getI18NPrefix, I18NSuffix } from '@/enum/I18NSuffix.enum'
import { getCaliberDto } from '@/shared/api-dto/get-caliber.dto'
import { getFactoryDto } from '@/shared/api-dto/get-factory.dto'
import { getLegalisationCategoryDto } from '@/shared/api-dto/get-legalisation-category.dto'
import { getBodyTypeDto } from '@/shared/api-dto/get-body-type.dto'
import { getHeadTypeDto } from '@/shared/api-dto/get-head-type.dto'
import { getPercussionTypeDto } from '@/shared/api-dto/get-percussion-type.dto'
import { getPriceHistoryDto } from '@/shared/api-dto/get-price-history.dto'
import { AmmunitionQueryFilter, getQueryFilter } from '@/shared/api-dto/query-filter.interface'

export const useAmmunitionStore = defineStore('ammunition-store', () => {
  // Appel API
  const { api } = useApiStore()
  // TOAST
  const { successMessage } = useToastStore()
  // Refs
  const ammunition = ref<AmmunitionDto>()
  const queryFilter = ref<AmmunitionQueryFilter>({ ...getQueryFilter() })
  // Private Attibute
  const _I18N_PREFIX = 'ammunition'
  const _GET_ALL_FN = 'getAllAmmunition'
  const _GET_BY_ID_FN = 'getAmmunitionById'

  // *******************Methodes***************

  const _createMutation = useMutation({
    mutationFn: async (ammunition: CreateAmmunitionDto) => {
      return await api.api.ammunitionControllerCreate(ammunition)
    }
  })

  const _updateMutation = useMutation({
    mutationFn: async (ammunition: UpdateAmmunitionDto) => {
      return await api.api.ammunitionControllerEdit(ammunition.id, ammunition)
    }
  })

  /**
   * Find All avec filtre et pagination
   */
  const queryFindAllFilteredAmmunitions = () =>
    useQuery({
      queryKey: [_GET_ALL_FN, queryFilter],
      queryFn: async () => {
        return await _fetchAllByCategory(queryFilter.value)
      },
      enabled: !!queryFilter.value
    })
  const _fetchAllByCategory = async (
    filters: AmmunitionQueryFilter
  ): Promise<PaginatedResponseDto | null> => {
    if (!filters) return null
    const res = await api.api.ammunitionControllerFindAll(filters)
    return res.data
  }

  const getByIdQuery = (id?: string) =>
    useQuery({
      queryKey: [_GET_BY_ID_FN, id],
      queryFn: () => _fetchById(id),
      enabled: !!id,
      retry: 0
    })
  const _fetchById = async (id?: string): Promise<AmmunitionDto | null> => {
    if (!id) return null
    const res = await api.api.ammunitionControllerFindById(parseInt(id))
    return res.data
  }

  function useAmmunitionForm(id?: string) {
    const emptyForm: CreateAmmunitionDto = {
      bodyType: getBodyTypeDto(),
      caliber: getCaliberDto(),
      factory: getFactoryDto(),
      name: '',
      category: getLegalisationCategoryDto(),
      initialSpeed: 0,
      description: '',
      packaging: 50,
      headType: getHeadTypeDto(),
      percussionType: getPercussionTypeDto(),
      priceHistory: getPriceHistoryDto(),
      inStock: 0
    }
    return useFormHandler<CreateAmmunitionDto, AxiosResponse<AmmunitionDto>>(
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

  const _deleteAmmunitionMutation = useMutation({
    mutationFn: async (id: number) => {
      return await api.api.ammunitionControllerDelete(id)
    },
    onSuccess() {
      successMessage(
        getI18NPrefix(_I18N_PREFIX) + I18NSuffix.SUMMARY,
        getI18NPrefix(_I18N_PREFIX) + I18NSuffix.DELETED
      )
    }
  })

  const deleteFunction = (id: number) => {
    _deleteAmmunitionMutation.mutate(id)
  }

  return {
    delete: deleteFunction,
    getByCategory: queryFindAllFilteredAmmunitions,
    getById: getByIdQuery,
    ammunition$: ammunition,
    formBuilder: useAmmunitionForm,
    getI18NPrefix: getI18NPrefix(_I18N_PREFIX),
    queryFilter$: queryFilter
  }
})
