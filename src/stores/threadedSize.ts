import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api'
import { useToastStore } from '@/stores/toast'
import { ref } from 'vue'
import type { CreateThreadedSizeDto, ThreadedSizeDto } from '@/api/Api'
import { useMutation, useQuery } from '@tanstack/vue-query'

export const useThreadedSizeStore = defineStore('threadedSize', () => {
  // Appel API
  const { api } = useApiStore()
  // TOAST
  const { successMessage } = useToastStore()
  // Refs
  const threadedSizes = ref<ThreadedSizeDto[]>([])
  // Private Attibute
  const _SUMMARY = 'threadedSize.summary'
  const _GET_ALL_FN = 'getAllThreadedSizes'
  // *******************Methodes***************
  const getAllThreadedSizesQuery = () =>
    useQuery({
      queryKey: [_GET_ALL_FN],
      queryFn: async () => {
        threadedSizes.value = (await api.api.threadedSizeControllerFindAllThreadedSize()).data
        return api.api.threadedSizeControllerFindAllThreadedSize()
      }
    })

  const createThreadedSizeMutation = useMutation({
    mutationFn: async (threadedSize: CreateThreadedSizeDto) => {
      return api.api.threadedSizeControllerCreate(threadedSize)
    },
    onSuccess(data) {
      threadedSizes.value.push(data.data)
      successMessage(_SUMMARY, 'threadedSize.form.success')
    }
  })

  return {
    getAll: getAllThreadedSizesQuery,
    create: createThreadedSizeMutation,
    threadedSizes$: threadedSizes
  }
})
