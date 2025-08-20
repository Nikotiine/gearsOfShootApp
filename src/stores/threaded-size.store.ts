import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api'
import { ref } from 'vue'
import type { CreateThreadedSizeDto, ThreadedSizeDto } from '@/api/Api'
import { useMutation, useQuery } from '@tanstack/vue-query'
import { getI18NPrefix } from '@/enum/I18NSuffix.enum'
import { useFormHandler } from '@/shared/useFormHandler'
import type { AxiosResponse } from 'axios'

export const useThreadedSizeStore = defineStore('threaded-size.store', () => {
  // Appel API
  const { api } = useApiStore()

  // Refs
  const submitSuccess = ref(false)
  // Private Attibute
  const _I18N_PREFIX = 'threadedSize'
  const _GET_ALL_FN = 'getAllThreadedSizes'
  const _GET_BY_ID_FN = 'getThreadedSizeById'

  // *******************Methodes***************
  const getAllQuery = () =>
    useQuery({
      queryKey: [_GET_ALL_FN],
      queryFn: async () => _fetchAll(),
      retry: 0
    })
  const _fetchAll = async () => {
    const res = await api.api.threadedSizeControllerFindAllThreadedSize()
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
    const res = await api.api.threadedSizeControllerFindById(parseInt(id))
    return res.data
  }
  const _createMutation = useMutation({
    mutationFn: async (threadedSize: CreateThreadedSizeDto) => {
      return api.api.threadedSizeControllerCreate(threadedSize)
    },
    onSuccess() {
      submitSuccess.value = true
    }
  })
  const _updateMutation = useMutation({
    mutationFn: async (threadedSize: ThreadedSizeDto) => {
      return api.api.threadedSizeControllerEdit(threadedSize.id, threadedSize)
    },
    onSuccess() {
      submitSuccess.value = true
    }
  })
  function useThreadedSizeForm(id?: string) {
    const emptyForm: CreateThreadedSizeDto = {
      size: '',
      reference: ''
    }
    return useFormHandler<CreateThreadedSizeDto, AxiosResponse<ThreadedSizeDto>>(
      emptyForm,
      getByIdQuery,
      _createMutation,
      _updateMutation,
      _I18N_PREFIX,
      _GET_BY_ID_FN,
      id,
      (data) => ({
        ...data
      })
    )
  }
  return {
    formBuilder: useThreadedSizeForm,
    getAll: getAllQuery,
    submitSuccess,
    getI18NPrefix: getI18NPrefix(_I18N_PREFIX)
  }
})
