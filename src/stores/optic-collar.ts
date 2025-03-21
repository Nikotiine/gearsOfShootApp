import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api'
import { useToastStore } from '@/stores/toast'
import { useMutation, useQuery } from '@tanstack/vue-query'
import type { CreateOpticCollarDto, OpticCollarDto, UpdateOpticCollarDto } from '@/api/Api'
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { RouterEnum } from '@/enum/router.enum'
import { useFormHandler } from '@/shared/useFormHandler'
import type { AxiosResponse } from 'axios'

export const useOpticCollarStore = defineStore('optic-collar', () => {
  // Appel API
  const { api } = useApiStore()
  // TOAST
  const { successMessage } = useToastStore()
  // Router
  const { push } = useRouter()
  // Refs
  const collars = ref<OpticCollarDto[]>([])
  const collar = ref<OpticCollarDto>()
  // Private Attibute
  const I18N_PREFIX = 'opticCollar'
  const _SUMMARY = I18N_PREFIX + '.summary'
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
    onSuccess: (data) => {
      push({ name: RouterEnum.OPTIC_COLLAR_LIST })
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
        successMessage(_SUMMARY, I18N_PREFIX + '.deleted')
      }
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
      factoryId: 0,
      height: 0,
      name: '',
      railSizeId: 0,
      description: ''
    }
    return useFormHandler<CreateOpticCollarDto, AxiosResponse<OpticCollarDto>>(
      emptyForm,
      getByIdQuery,
      _createMutation,
      _updateMutation,
      I18N_PREFIX,
      id,
      (data) => ({
        ...data,
        factoryId: data.factory.id,
        railSizeId: data.railSize.id
      })
    )
  }
  return {
    collars$: collars,
    getAll: getAllQuery,
    getById: getByIdQuery,
    delete: deleteFunction,
    collar$: collar,
    formBuilder: useOpticCollarForm
  }
})
