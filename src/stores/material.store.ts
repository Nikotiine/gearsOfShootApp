import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api'
import { ref } from 'vue'
import type { CreateMaterialDto, MaterialDto } from '@/api/Api'
import { useMutation, useQuery } from '@tanstack/vue-query'
import { useFormHandler } from '@/shared/useFormHandler'
import type { AxiosResponse } from 'axios'
import { getI18NPrefix } from '@/enum/I18NSuffix.enum'

export const useMaterialStore = defineStore('material-store', () => {
  // Appel API
  const { api } = useApiStore()

  // Refs
  const mutationSuccess = ref(false)
  // Private Attibute
  const _I18N_PREFIX = 'material'
  const _GET_ALL_FN = 'getAllMaterial'
  const _GET_BY_ID_FN = 'getMaterialById'

  // *******************Methodes***************
  const _createMutation = useMutation({
    mutationFn: async (materialDto: CreateMaterialDto) => {
      return await api.api.materialControllerCreate(materialDto)
    },
    onSuccess() {
      mutationSuccess.value = true
    }
  })
  const _updateMutation = useMutation({
    mutationFn: async (material: MaterialDto) => {
      return await api.api.materialControllerEdit(material.id, material)
    },
    onSuccess() {
      mutationSuccess.value = true
    }
  })
  const getAllQuery = () =>
    useQuery({
      queryKey: [_GET_ALL_FN],
      queryFn: async () => _fetchAll(),
      retry: 0
    })
  const _fetchAll = async () => {
    const res = await api.api.materialControllerFindAll()
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
    const res = await api.api.materialControllerFindById(parseInt(id))
    return res.data
  }
  function useMaterialForm(id?: string) {
    const emptyForm: CreateMaterialDto = {
      name: '',
      reference: ''
    }
    return useFormHandler<CreateMaterialDto, AxiosResponse<MaterialDto>>(
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
  return {
    formBuilder: useMaterialForm,
    getAll: getAllQuery,
    mutationSuccess,
    getI18NPrefix: getI18NPrefix(_I18N_PREFIX)
  }
})
