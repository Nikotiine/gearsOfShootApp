import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api'
import { useToastStore } from '@/stores/toast'
import { useMutation, useQuery } from '@tanstack/vue-query'
import type { CreateHandGunDto, HandGunDto, UpdateHandGunDto } from '@/api/Api'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

export const useHandGunStore = defineStore('hand-gun', () => {
  const { api } = useApiStore()
  const { successMessage } = useToastStore()
  const { push } = useRouter()
  const categoryId = ref<number>(0)
  const handgunId = ref<number>(0)
  const findByIdRequestIsEnabled = computed(() => handgunId.value > 0)
  const handguns = ref<HandGunDto[]>([])
  const handgun = ref<HandGunDto | null>(null)
  const createHandGunMutation = useMutation({
    mutationFn: async (handgun: CreateHandGunDto) => {
      return await api.api.handGunControllerCreate(handgun)
    },
    onSuccess(data) {
      handguns.value.push(data.data)
      successMessage('weapon.summary', 'weapon.add.success')
    }
  })

  const updateHandGunMutation = useMutation({
    mutationFn: async (handgun: UpdateHandGunDto) => {
      return await api.api.handGunControllerUpdate(handgun.id, handgun)
    },
    onSuccess(data) {
      const index = handguns.value.findIndex((hand) => hand.id === data.data.id)
      handguns.value.splice(index, 1)
      handguns.value.push(data.data)
      successMessage('weapon.summary', 'weapon.add.edit')
      push('/admin/gestion/list/weapon/handgun/' + data.data.category.name)
    }
  })

  function setCategoryId(id: number): void {
    categoryId.value = id
  }
  function setId(id: number): void {
    handgunId.value = id
  }
  const getAllHandGunByCategoryQuery = useQuery({
    queryKey: ['get-all-handgun-by-category', categoryId],
    queryFn: async () => {
      const res = await api.api.handGunControllerFindAllByCategory(categoryId.value)
      handguns.value = res.data
      return res
    }
  })

  const getHandGunById = useQuery({
    queryKey: ['gat-handgun-by-id', handgunId],
    queryFn: async () => {
      const res = await api.api.handGunControllerFindById(handgunId.value)
      handgun.value = res.data
      return res
    },
    enabled: findByIdRequestIsEnabled
  })
  return {
    create: createHandGunMutation,
    edit: updateHandGunMutation,
    setCategoryId: setCategoryId,
    getAllHandGunByCategory: getAllHandGunByCategoryQuery,
    setHandGunId: setId,
    getHandGunById: getHandGunById,
    handgunById: handgun
  }
})
