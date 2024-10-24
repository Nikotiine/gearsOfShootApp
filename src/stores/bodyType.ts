import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api'
import { useToastStore } from '@/stores/toast'
import { computed, ref } from 'vue'
import { useMutation, useQuery } from '@tanstack/vue-query'
import type { AmmunitionBodyTypeDto, CreateAmmunitionBodyTypeDto } from '@/api/Api'

export const useBodyTypeStore = defineStore('bodyType', () => {
  const { api } = useApiStore()
  const { successMessage } = useToastStore()
  const _isError = ref(false)
  const _errorMessage = ref('')
  const datas = ref<AmmunitionBodyTypeDto[] | any>([])
  const isError = computed(() => _isError)
  const toto = computed(() => datas)
  const errorMessage = computed(() => _errorMessage)

  const { mutate, isSuccess } = useMutation({
    mutationFn: (bodyType: CreateAmmunitionBodyTypeDto) => {
      return api.api.ammunitionBodyTypeControllerCreate(bodyType)
    },
    onSuccess: async (data, variables, context) => {
      successMessage('bodyType.summary', 'bodyType.create.success')
      const res = data.data
      datas.value.push(res)
      console.log('res', res)
    },
    onError(error: any) {
      _isError.value = true
      _errorMessage.value = error.response.data.message
    }
  })

  const { data, isLoading } = useQuery({
    queryKey: ['bodyTypeList'],
    queryFn: async () => {
      datas.value = await api.api.ammunitionBodyTypeControllerFindAllBodyTypes()
      console.log(datas.value)
      return api.api.ammunitionBodyTypeControllerFindAllBodyTypes()
    }
  })

  return {
    createBodyType: mutate,
    isError,
    errorMessage,
    bodyTypeListQueryData: data,
    bodyTypeListQueryLoading: isLoading,
    test: toto
  }
})
