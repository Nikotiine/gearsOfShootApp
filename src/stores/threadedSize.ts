import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api'
import { useToastStore } from '@/stores/toast'
import { ref } from 'vue'
import type { CreateThreadedSizeDto, ThreadedSizeDto } from '@/api/Api'
import { useMutation, useQuery } from '@tanstack/vue-query'

export const useThreadedSizeStore = defineStore('threadedSize', () => {
  const { api } = useApiStore()
  const { successMessage } = useToastStore()
  const threadedSizes = ref<ThreadedSizeDto[]>([])
  const getAllThreadedSizesQuery = () =>
    useQuery({
      queryKey: ['getAllThreadedSizes'],
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
      successMessage('threadedSize.summary', 'threadedSize.form.success')
    }
  })

  return {
    getAll: getAllThreadedSizesQuery,
    create: createThreadedSizeMutation,
    threadedSizes$: threadedSizes
  }
})
