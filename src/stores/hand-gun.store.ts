import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api'
import { useToastStore } from '@/stores/toast'
import { useMutation, useQuery } from '@tanstack/vue-query'
import type { CreateHandGunDto, HandGunDto, UpdateHandGunDto } from '@/api/Api'
import { type Ref, ref } from 'vue'
import { getI18NPrefix, I18NSuffix } from '@/enum/I18NSuffix.enum'
import { useFormHandler } from '@/shared/useFormHandler'
import type { AxiosResponse } from 'axios'
import { getWeaponTypeDto } from '@/shared/api-dto/get-weapon-type.dto'
import { getCaliberDto } from '@/shared/api-dto/get-caliber.dto'
import { getFactoryDto } from '@/shared/api-dto/get-factory.dto'
import { getLegalisationCategoryDto } from '@/shared/api-dto/get-legalisation-category.dto'
import { getBarrelTypeDto } from '@/shared/api-dto/get-barrel-type.dto'
import { getPercussionTypeDto } from '@/shared/api-dto/get-percussion-type.dto'
import { getTriggerTypeDto } from '@/shared/api-dto/get-trigger-type.dto'
import { getPriceHistoryDto } from '@/shared/api-dto/get-price-history.dto'
import { useRoute } from 'vue-router'
import { type BreadCrumbState, useBreadcrumbStore } from '@/stores/breadcrumb.store'

export const useHandGunStore = defineStore('hand-gun-store', () => {
  // Appel API
  const { api } = useApiStore()

  // TOAST
  const { successMessage } = useToastStore()
  const route = useRoute()
  const stepperStore = useBreadcrumbStore()
  // Refs
  const mutationSuccess = ref(false)
  const handguns = ref<HandGunDto[]>([])
  const handgun = ref<HandGunDto | null>(null)

  // Private Attibute
  const _I18N_PREFIX = 'handgun'
  const _GET_ALL_BY_CATEGORY_FN = 'getAllHandGunByCategory'
  const _GET_ALL_FN = 'getAllHandGun'
  const _GET_BY_ID_FN = 'getHandGunById'
  // *******************Methodes***************
  const _createMutation = useMutation({
    mutationFn: async (handgun: CreateHandGunDto) => {
      return await api.api.handGunControllerCreate(handgun)
    },
    onSuccess() {
      mutationSuccess.value = true
    }
  })

  const _updateMutation = useMutation({
    mutationFn: async (handgun: UpdateHandGunDto) => {
      return await api.api.handGunControllerUpdate(handgun.id, handgun)
    },
    onSuccess() {
      mutationSuccess.value = true
    }
  })

  const getAllHandGunByCategoryQuery = (category: Ref<string>) =>
    useQuery({
      queryKey: [_GET_ALL_BY_CATEGORY_FN, category.value],
      queryFn: async () => {
        const res = await api.api.handGunControllerFindAllByCategory(category.value)
        handguns.value = res.data
        return res
      },
      enabled: !!category.value
    })

  const _getAllHandgunQuery = useQuery({
    queryKey: [_GET_ALL_FN],
    queryFn: async () => {
      return await api.api.handGunControllerFindAll()
    }
  })

  const getAllFunction = () => {
    return _getAllHandgunQuery.data.value?.data ?? []
  }

  const getByIdQuery = (id?: string) =>
    useQuery({
      queryKey: [_GET_BY_ID_FN, id],
      queryFn: () => _fetchById(id),
      enabled: !!id,
      retry: 0
    })

  const _fetchById = async (id?: string) => {
    if (!id) {
      return null
    }
    const res = await api.api.handGunControllerFindById(parseInt(id))
    handgun.value = res.data
    stepperStore.setStep({
      label: stepperStore.generateLabel(_I18N_PREFIX, res.data.name),
      index: 2,
      path: route.path
    })
    return res.data
  }
  const _deleteMutation = useMutation({
    mutationFn: async (opticId: number) => {
      return await api.api.handGunControllerDelete(opticId)
    },
    onSuccess() {
      successMessage(
        getI18NPrefix(_I18N_PREFIX) + I18NSuffix.SUMMARY,
        getI18NPrefix(_I18N_PREFIX) + I18NSuffix.DELETED
      )
    }
  })

  const deleteFunction = (id: number) => {
    _deleteMutation.mutate(id)
  }
  function useHandGunForm(id?: string) {
    const emptyForm: CreateHandGunDto = {
      type: getWeaponTypeDto(),
      caliber: getCaliberDto(),
      factory: getFactoryDto(),
      name: '',
      variation: '',
      barrelType: getBarrelTypeDto(),
      isThreadedBarrel: false,
      barrelLength: 0,
      threadedSize: null,
      isAdjustableTrigger: false,
      adjustableTriggerMaxWeight: null,
      adjustableTriggerMinWeight: null,
      description: '',
      category: getLegalisationCategoryDto(),
      percussionType: getPercussionTypeDto(),
      providedMagazineQuantity: 0,
      barrelSize: 0,
      buttMaterial: null,
      barrelColor: null,
      buttColor: null,
      decocking: true,
      isPicatinyRailSlop: false,
      isAdjustableBackSight: true,
      isAdjustableFrontSight: true,
      providedOpticReadyPlates: [],
      isOpticReady: false,
      isExternalHammer: false,
      slideMaterial: null,
      slideColor: null,
      triggerType: getTriggerTypeDto(),
      priceHistory: getPriceHistoryDto(),
      inStock: 0
    }
    const breadCrumbState: BreadCrumbState = {
      label: stepperStore.generateLabel(_I18N_PREFIX),
      index: 1,
      path: route.fullPath
    }
    if (!id) {
      stepperStore.setStep(breadCrumbState)
    }
    return useFormHandler<CreateHandGunDto, AxiosResponse<HandGunDto>>(
      emptyForm,
      getByIdQuery,
      _createMutation,
      _updateMutation,
      _I18N_PREFIX,
      _GET_BY_ID_FN,
      undefined,
      id,
      (data) => ({
        ...data
      })
    )
  }

  return {
    formBuilder: useHandGunForm,
    delete: deleteFunction,
    getAllByCategory: getAllHandGunByCategoryQuery,
    getHandGunById: getByIdQuery,
    handgun$: handgun,
    getAll: getAllFunction,
    handguns$: handguns,
    getI18NPrefix: getI18NPrefix(_I18N_PREFIX)
  }
})
