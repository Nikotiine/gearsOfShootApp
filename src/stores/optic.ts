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
import { ref, watch } from 'vue'
import { RouterEnum } from '@/enum/router.enum'
import { useRouter } from 'vue-router'

export const useOpticStore = defineStore('optic', () => {
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
  const I18N_PREFIX = 'optic'
  const _SUMMARY = I18N_PREFIX + '.summary'
  const _GET_ALL_FN = 'getAllOptic'
  const _GET_BY_ID_FN = 'getOpticById'
  const _PREREQUISITE_FN = 'prerequisite-optic'
  // *******************Methodes***************
  const queryPrerequisitesOpticList = useQuery({
    queryKey: [_PREREQUISITE_FN],
    queryFn: async () => {
      const res = await api.api.opticControllerFindPrerequisitesOpticList()
      opticType.value = res.data.types
      opticUnits.value = res.data.units
      focalPlanes.value = res.data.focalPlanes
      return res
    }
  })

  const getAllOpticsQuery = () =>
    useQuery({
      queryKey: [_GET_ALL_FN],
      queryFn: async () => {
        const res = await api.api.opticControllerFindAllOptics()
        optics.value = res.data
        return res
      }
    })

  const createOpticMutation = useMutation({
    mutationFn: async (optic: CreateOpticDto) => {
      return await api.api.opticControllerCreate(optic)
    },
    onSuccess(data) {
      optics.value.push(data.data)
      successMessage(_SUMMARY, I18N_PREFIX + '.success')
    }
  })

  const updateOpticMutation = useMutation({
    mutationFn: async (optic: UpdateOpticDto) => {
      return await api.api.opticControllerEdit(optic.id, optic)
    },
    onSuccess(data) {
      const index = optics.value.findIndex((optic) => optic.id === data.data.id)
      optics.value.splice(index, 1)
      optics.value.push(data.data)
      push({ name: RouterEnum.OPTIC_LIST })
      successMessage(_SUMMARY, I18N_PREFIX + '.update')
    }
  })

  const _deleteMutation = useMutation({
    mutationFn: async (opticId: number) => {
      return await api.api.opticControllerDelete(opticId)
    },
    onSuccess(data) {
      if (data.data.isSuccess) {
        const index = optics.value.findIndex((optic) => optic.id === data.data.id)
        optics.value.splice(index, 1)
        successMessage(_SUMMARY, I18N_PREFIX + '.deleted')
      }
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
      factoryId: 0,
      maxDrift: 0,
      maxElevation: 0,
      isParallax: false,
      minZoom: 0,
      maxZoom: 0,
      minParallax: 0,
      maxParallax: 0,
      lensDiameter: 0,
      valueOfOneClick: 0,
      focalPlaneId: 0,
      opticUnitId: 0,
      opticTypeId: 0,
      eyeRelief: 0,
      isCollarsProvided: false,
      length: 0
    }
    const form = ref<CreateOpticDto>({ ...emptyForm })
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
            focalPlaneId: newData.focalPlane.id,
            opticUnitId: newData.opticUnit.id,
            opticTypeId: newData.type.id
          }
        }
      },
      { immediate: true }
    )
    return { form, isSuccess, resetForm }
  }

  return {
    prerequisiteOpticQuery: queryPrerequisitesOpticList,
    create: createOpticMutation,
    edit: updateOpticMutation,
    delete: deleteFunction,
    units$: opticUnits,
    types$: opticType,
    focalPlanes$: focalPlanes,
    getAll: getAllOpticsQuery,
    getById: getByIdQuery,
    optic$: optic,
    optics$: optics,
    formBuilder: useOpticForm
  }
})
