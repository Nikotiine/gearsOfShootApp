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

const useSoundReducderStore = defineStore('sound-noise-reducer', () => {
  // Appel API
  const { api } = useApiStore()

  // Router
  const { push } = useRouter()

  // Private Attibute
  const I18N_PREFIX = 'soundNoiseReducer'
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
  const getByIdQuery = (id?: string) =>
    useQuery({
      queryKey: [_GET_BY_ID_FN, id],
      queryFn: () => _fetchById(id),
      enabled: !!id,
      retry: 0
    })
  const getAllQuery = () => {
    useQuery({
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
      caliberId: 0,
      factoryId: 0,
      length: 0,
      isCleanable: false,
      threadedSizeId: 0
    }
    return useFormHandler<CreateSoundNoiseReducerDto, AxiosResponse<SoundNoiseReducerDto>>(
      emptyForm,
      getByIdQuery,
      _createMutation,
      _updateMutation,
      I18N_PREFIX,
      id,
      (data) => ({
        ...data,
        factoryId: data.factory.id,
        caliberId: data.caliber.id,
        threadedSizeId: data.threadedSize.id
      })
    )
  }
  return {
    getById: getByIdQuery,
    getAll: getAllQuery,
    formBuilder: useSoundNoiseForm
  }
})
