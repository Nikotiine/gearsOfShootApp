import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api'
import { useToastStore } from '@/stores/toast'
import { useI18n } from 'vue-i18n'
import { useMutation, useQuery } from '@tanstack/vue-query'
import type { CreateOpticCollarDto, OpticCollarDto, UpdateOpticCollarDto } from '@/api/Api'
import { ref, watch } from 'vue'

export const useOpticCollarStore = defineStore('optic-collar', () => {
  // Appel API
  const { api } = useApiStore()
  // TOAST
  const { successMessage } = useToastStore()
  // I18N
  const { t } = useI18n()
  // Refs
  const collars = ref<OpticCollarDto[]>([])
  const collar = ref<OpticCollarDto>()
  // Private Attibute
  const _SUMMARY = 'opticCollar.summary'
  const _GET_ALL_FN = 'getAllOpticCollar'
  const _GET_BY_ID_FN = 'getOpticCollarById'
  // *******************Methodes***************
  const createOpticCollarMutation = useMutation({
    mutationFn: async (collar: CreateOpticCollarDto) => {
      return api.api.opticCollarControllerCreate(collar)
    },
    onSuccess: (data) => {
      collars.value.push(data.data)
      successMessage(_SUMMARY, 'opticCollar.form.success')
    }
  })

  const updateOpticCollarMutation = useMutation({
    mutationFn: async (collar: UpdateOpticCollarDto) => {
      return await api.api.opticCollarControllerEdit(collar.id, collar)
    },
    onSuccess: (data) => {
      const index = collars.value.findIndex((collar) => collar.id === data.data.id)
      collars.value.splice(index, 1)
      collars.value.push(data.data)
      successMessage(_SUMMARY, 'opticCollar.form.update')
    }
  })

  const getAllQuery = () =>
    useQuery({
      queryKey: [_GET_ALL_FN],
      queryFn: async () => {
        const res = await api.api.opticCollarControllerFindAll()
        collars.value = res.data
        return res
      }
    })

  const _deleteMutation = useMutation({
    mutationFn: async (opticId: number) => {
      return await api.api.opticCollarControllerDelete(opticId)
    },
    onSuccess(data) {
      if (data.data.isSuccess) {
        const index = collars.value.findIndex((optic) => optic.id === data.data.id)
        collars.value.splice(index, 1)
        successMessage(_SUMMARY, t(data.data.message))
      }
    }
  })

  const deleteFunction = (id: number) => {
    _deleteMutation.mutate(id)
  }

  const getByIdQuery = (id?: string) =>
    useQuery({
      queryKey: [_GET_BY_ID_FN, id],
      queryFn: () => _fetchCollarById(id),
      enabled: !!id,
      retry: 0
    })

  const _fetchCollarById = async (id?: string) => {
    if (!id) return null
    const res = await api.api.opticCollarControllerFindById(parseInt(id))
    return res.data
  }

  function useOpticCollarForm(id?: string) {
    const form = ref<CreateOpticCollarDto>({
      diameter: 0,
      factoryId: 0,
      height: 0,
      name: '',
      railSizeId: 0,
      description: ''
    })

    const { data, isSuccess } = getByIdQuery(id)

    watch(
      () => data.value,
      (newData) => {
        if (isSuccess.value && newData) {
          form.value = {
            ...newData,
            factoryId: newData.factory.id,
            railSizeId: newData.railSize.id
          }
        }
      },
      { immediate: true }
    )

    return { form, isSuccess }
  }

  return {
    create: createOpticCollarMutation,
    collars$: collars,
    getAll: getAllQuery,
    getById: getByIdQuery,
    delete: deleteFunction,
    edit: updateOpticCollarMutation,
    collar$: collar,
    builder: useOpticCollarForm
  }
})
