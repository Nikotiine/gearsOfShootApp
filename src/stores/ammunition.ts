import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api'
import { useToastStore } from '@/stores/toast'
import { useMutation, useQuery } from '@tanstack/vue-query'
import type { AmmunitionDto, CreateAmmunitionDto, UpdateAmmunitionDto } from '@/api/Api'
import { type Ref, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

export const useAmmunitionStore = defineStore('ammunition', () => {
  // Appel API
  const { api } = useApiStore()
  // TOAST
  const { successMessage } = useToastStore()
  // I18N
  const { t } = useI18n()
  // Refs
  const ammunitions = ref<AmmunitionDto[]>([])
  const ammunition = ref<AmmunitionDto>()
  // Private Attibute
  const I18N_PREFIX = 'opticCollar'
  const _SUMMARY = I18N_PREFIX + '.summary'
  // const _GET_ALL_FN = 'getAllAmmuntiion'
  const _GET_ALL_BY_CATEGORY_FN = 'getAllAmmunitionByCategory'
  const _GET_BY_ID_FN = 'getAmmunitionById'
  const _PREREQUISITE_FN = 'prerequisite-ammunition'
  // *******************Methodes***************
  const queryPrerequisitesAmmunitionList = useQuery({
    queryKey: [_PREREQUISITE_FN],
    queryFn: async () => {
      return await api.api.ammunitionControllerFindPrerequisitesAmmunitionList()
    }
  })

  const createAmmunitionMutation = useMutation({
    mutationFn: async (ammunition: CreateAmmunitionDto) => {
      return await api.api.ammunitionControllerCreate(ammunition)
    },
    onSuccess(data) {
      ammunitions.value.push(data.data)
      successMessage(_SUMMARY, 'ammunition.add.success')
    }
  })

  const updateAmmunitionMutation = useMutation({
    mutationFn: async (ammunition: UpdateAmmunitionDto) => {
      return await api.api.ammunitionControllerEdit(ammunition.id, ammunition)
    },
    onSuccess(data) {
      const index = ammunitions.value.findIndex((ammunition) => ammunition.id === data.data.id)
      ammunitions.value.splice(index, 1)
      ammunitions.value.push(data.data)
      successMessage(_SUMMARY, 'ammunition.add.update')
    }
  })

  const queryFindAllAmmunitionByCategory = (category: Ref<string>) =>
    useQuery({
      queryKey: [_GET_ALL_BY_CATEGORY_FN, category.value],
      queryFn: async () => {
        console.log(category.value)
        return await api.api.ammunitionControllerFindByCategory(category.value)
      },
      enabled: !!category.value
    })

  function useAmmunitionForm(id?: string) {
    const emptyForm: CreateAmmunitionDto = {
      bodyTypeId: 0,
      caliberId: 0,
      factoryId: 0,
      name: '',
      categoryId: 0,
      initialSpeed: 0,
      description: '',
      packaging: 50,
      headTypeId: 0,
      percussionTypeId: 0
    }
    const form = ref<CreateAmmunitionDto>({
      ...emptyForm
    })
    const resetForm = () => {
      form.value = emptyForm
    }
    const { data, isSuccess } = getByIdQuery(id)
    watch(
      () => data.value,
      (newData) => {
        if (isSuccess.value && newData) {
          form.value = {
            ...newData,
            factoryId: newData.factory.id,
            percussionTypeId: newData.percussionType.id,
            bodyTypeId: newData.bodyType.id,
            caliberId: newData.caliber.id,
            categoryId: newData.category.id,
            headTypeId: newData.headType.id
          }
        }
      },
      { immediate: true }
    )

    return { form, isSuccess, resetForm }
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
    const res = await api.api.ammunitionControllerFindById(parseInt(id))
    return res.data
  }
  const _deleteAmmunitionMutation = useMutation({
    mutationFn: async (id: number) => {
      return await api.api.ammunitionControllerDelete(id)
    },
    onSuccess(data) {
      const index = ammunitions.value.findIndex((optic) => optic.id === data.data.id)
      ammunitions.value.splice(index, 1)
      successMessage(_SUMMARY, t(data.data.message))
    }
  })

  const deleteFunction = (id: number) => {
    _deleteAmmunitionMutation.mutate(id)
  }

  return {
    prerequisitesAmmoList: queryPrerequisitesAmmunitionList,
    create: createAmmunitionMutation,
    edit: updateAmmunitionMutation,
    delete: deleteFunction,
    getByCategory: queryFindAllAmmunitionByCategory,
    getById: getByIdQuery,
    ammunition$: ammunition,
    formBuilder: useAmmunitionForm
  }
})
