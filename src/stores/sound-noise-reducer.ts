import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api'
import { useRouter } from 'vue-router'
import { useMutation, useQuery } from '@tanstack/vue-query'
import type {
  SoundNoiseReducerDto,
  CreateSoundNoiseReducerDto,
  UpdateSoundNoiseReducerDto
} from '@/api/Api'

import { useFormHandler } from '@/shared/useFormHandler'
import type { AxiosResponse } from 'axios'
import { RouterEnum } from '@/enum/router.enum'
import { useToastStore } from '@/stores/toast'
import { getCaliberDto } from '@/shared/api-dto/get-caliber.dto'
import { getFactoryDto } from '@/shared/api-dto/get-factory.dto'
import { getThreadedSizeDto } from '@/shared/api-dto/get-threaded-size.dto'

export const useSoundReducerStore = defineStore('sound-noise-reducer', () => {
  // Appel API
  const { api } = useApiStore()
  // TOAST
  const { successMessage } = useToastStore()
  // Router
  const { push } = useRouter()

  // Private Attibute
  const _I18N_PREFIX = 'soundNoiseReducer.'
  const _SUMMARY = _I18N_PREFIX + 'summary'
  const _GET_ALL_FN = 'getAllSoundNoiseReducer'
  const _GET_BY_ID_FN = 'getSoundNoiseReducerById'
  // *******************Methodes***************
  const _fetchById = async (id?: string) => {
    if (!id) return null
    const res = await api.api.soundReducerControllerFindById(parseInt(id))
    return res.data
  }
  const _fetchAll = async () => {
    const res = await api.api.soundReducerControllerFindAll()
    return res.data
  }
  const _createMutation = useMutation({
    mutationFn: async (rds: CreateSoundNoiseReducerDto) => {
      return await api.api.soundReducerControllerCreate(rds)
    }
  })

  const _updateMutation = useMutation({
    mutationFn: async (rds: UpdateSoundNoiseReducerDto) => {
      return await api.api.soundReducerControllerEdit(rds.id, rds)
    },
    onSuccess() {
      push({ name: RouterEnum.RDS_LIST })
    }
  })
  const _deleteMutation = useMutation({
    mutationFn: async (opticId: number) => {
      return await api.api.opticCollarControllerDelete(opticId)
    },
    onSuccess(data) {
      if (data.data.isSuccess) {
        successMessage(_SUMMARY, _I18N_PREFIX + 'deleted')
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
  const getAllQuery = () => {
    return useQuery({
      queryKey: [_GET_ALL_FN],
      queryFn: () => _fetchAll(),
      retry: 0
    })
  }

  function useSoundNoiseForm(id?: string) {
    const emptyForm: CreateSoundNoiseReducerDto = {
      diameter: 0,
      name: '',
      description: '',
      caliber: getCaliberDto(),
      factory: getFactoryDto(),
      length: 0,
      isCleanable: false,
      threadedSize: getThreadedSizeDto(),
      chicane: 0,
      estimatedNoiseReduction: 0
    }
    return useFormHandler<CreateSoundNoiseReducerDto, AxiosResponse<SoundNoiseReducerDto>>(
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
  function getI18NPrefix(): string {
    return _I18N_PREFIX
  }
  return {
    getById: getByIdQuery,
    getAll: getAllQuery,
    formBuilder: useSoundNoiseForm,
    getI18NPrefix,
    delete: deleteFunction
  }
})
