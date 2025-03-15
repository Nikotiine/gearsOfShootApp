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
import { type Ref, ref } from 'vue'
import { useI18n } from 'vue-i18n'

export const useOpticStore = defineStore('optic', () => {
  // Appel API
  const { api } = useApiStore()
  // TOAST
  const { successMessage } = useToastStore()
  // I18N
  const { t } = useI18n()
  // Refs
  const opticUnits = ref<OpticUnitDto[]>([])
  const opticType = ref<OpticTypeDto[]>([])
  const focalPlanes = ref<FocalPlaneDto[]>([])
  const optics = ref<OpticDto[]>([])
  const optic = ref<OpticDto>()

  // Private Attibute
  const _SUMMARY = 'optic.summary'
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
      successMessage(_SUMMARY, 'optic.form.success')
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
      successMessage(_SUMMARY, 'optic.form.success')
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
        successMessage(_SUMMARY, t(data.data.message))
      }
    }
  })

  const deleteFunction = (id: number) => {
    _deleteMutation.mutate(id)
  }

  const getByIdQuery = (id: Ref<number>) =>
    useQuery({
      queryKey: [_GET_BY_ID_FN, id.value],
      queryFn: async () => {
        const res = await api.api.opticControllerFindById(id.value)
        optic.value = res.data
        return res
      },
      enabled: () => id.value > 0,
      retry: 0
    })

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
    optics$: optics
  }
})
