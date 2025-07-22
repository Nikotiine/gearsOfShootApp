import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api'
import { useToastStore } from '@/stores/toast'
import { useMutation, useQuery } from '@tanstack/vue-query'
import type {
  CreateOpticDto,
  FocalPlaneDto,
  OpticDto,
  OpticTypeDto,
  OpticUnitDto,
  UpdateOpticDto
} from '@/api/Api'
import { ref } from 'vue'
import { RouterEnum } from '@/enum/router.enum'
import { useRouter } from 'vue-router'
import { useFormHandler } from '@/shared/useFormHandler'
import type { AxiosResponse } from 'axios'
import { getFactoryDto } from '@/shared/api-dto/get-factory.dto'
import { getFocalPlaneDto } from '@/shared/api-dto/get-focal-plane.dto'
import { getOpticUnitDto } from '@/shared/api-dto/get-optic-unit.dto'
import { getOpticTypeDto } from '@/shared/api-dto/get-optic-type.dto'
import { getPriceHistoryDto } from '@/shared/api-dto/get-price-history.dto'
import { getOpticRailSizeDto } from '@/shared/api-dto/get-optic-rail-size.dto'
import { getI18NPrefix, I18NSuffix } from '@/enum/I18NSuffix.enum'

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
  const optics = ref<OpticDto[]>([])
  const optic = ref<OpticDto>()

  // Private Attibute
  const _I18N_PREFIX = 'optic'

  const _GET_ALL_FN = 'getAllOptic'
  const _GET_BY_ID_FN = 'getOpticById'

  // *******************Methodes***************

  const getAllOpticsQuery = () =>
    useQuery({
      queryKey: [_GET_ALL_FN],
      queryFn: async () => {
        const res = await api.api.opticControllerFindAllOptics()
        optics.value = res.data
        return res
      }
    })

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
      push({ name: RouterEnum.OPTIC_LIST })
    }
  })

  const _deleteMutation = useMutation({
    mutationFn: async (opticId: number) => {
      return await api.api.opticControllerDelete(opticId)
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
      valueOfOneClick: 0,
      focalPlane: getFocalPlaneDto(),
      opticUnit: getOpticUnitDto(),
      opticType: getOpticTypeDto(),
      eyeRelief: 0,
      isCollarsProvided: false,
      length: 0,
      priceHistory: getPriceHistoryDto(),
      providedOpticCollarSize: getOpticRailSizeDto()
    }
    return useFormHandler<CreateOpticDto, AxiosResponse<OpticDto>>(
      emptyForm,
      getByIdQuery,
      _createMutation,
      _updateMutation,
      _I18N_PREFIX,
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
    optic$: optic,
    optics$: optics,
    formBuilder: useOpticForm,
    getI18NPrefix: getI18NPrefix(_I18N_PREFIX)
  }
})
