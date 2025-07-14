import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api'
import type {
  CreateHandGunDto,
  CreateRiffleDto,
  HandGunDto,
  RiffleDto,
  UpdateRiffleDto
} from '@/api/Api'
import { useMutation, useQuery } from '@tanstack/vue-query'
import { useToastStore } from '@/stores/toast'
import { type Ref, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { getI18NPrefix } from '@/enum/I18NSuffix.enum'
import { getWeaponTypeDto } from '@/shared/api-dto/get-weapon-type.dto'
import { getCaliberDto } from '@/shared/api-dto/get-caliber.dto'
import { getFactoryDto } from '@/shared/api-dto/get-factory.dto'
import { getBarrelTypeDto } from '@/shared/api-dto/get-barrel-type.dto'
import { getLegalisationCategoryDto } from '@/shared/api-dto/get-legalisation-category.dto'
import { getPercussionTypeDto } from '@/shared/api-dto/get-percussion-type.dto'
import { useFormHandler } from '@/shared/useFormHandler'
import type { AxiosResponse } from 'axios'

export const useRiffleStore = defineStore('riffle', () => {
  // Appel API
  const { api } = useApiStore()
  // TOAST
  const { successMessage } = useToastStore()
  // I18N
  const { t } = useI18n()
  // Refs
  const mutationSuccess = ref(false)

  const riffles = ref<RiffleDto[]>([])
  const riffle = ref<RiffleDto>()
  // Private Attibute
  const _I18N_PREFIX = 'weapon'
  const _SUMMARY = 'weapon.summary'
  const _GET_ALL_BY_CATEGORY_FN = 'getAllRiffleByCategory'
  const _GET_ALL_FN = 'getAllRiffle'
  const _GET_BY_ID_FN = 'getRiffleById'
  // *******************Methodes***************
  const _createMutation = useMutation({
    mutationFn: async (riffle: CreateRiffleDto) => {
      return await api.api.riffleControllerCreate(riffle)
    },
    onSuccess() {
      mutationSuccess.value = true
    }
  })

  const _updateMutation = useMutation({
    mutationFn: async (riffle: UpdateRiffleDto) => {
      return await api.api.riffleControllerUpdate(riffle.id, riffle)
    },
    onSuccess() {
      mutationSuccess.value = true
    }
  })

  const _getAllRiffleQuery = useQuery({
    queryKey: [_GET_ALL_FN],
    queryFn: async () => {
      return await api.api.riffleControllerFindAll()
    }
  })

  const getAllData = (): RiffleDto[] => {
    return _getAllRiffleQuery.data.value?.data ?? []
  }

  const getAllRiffleByCategoryQuery = (catgory: Ref<string>) =>
    useQuery({
      queryKey: [_GET_ALL_BY_CATEGORY_FN, catgory.value],
      queryFn: async () => {
        const res = await api.api.riffleControllerFindAllByCategory(catgory.value)
        riffles.value = res.data
        return res
      },
      enabled: !!catgory.value
    })

  const getByIdQuery = (id?: string) =>
    useQuery({
      queryKey: [_GET_BY_ID_FN, id],
      queryFn: () => _fetchById(id),
      enabled: !!id,
      retry: 0
    })
  const _fetchById = async (id?: string) => {
    if (!id) return null
    const res = await api.api.riffleControllerFindById(parseInt(id))
    return res.data
  }
  const _deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      return await api.api.riffleControllerDelete(id)
    },
    onSuccess(data) {
      if (data.data.isSuccess) {
        const index = riffles.value.findIndex((optic) => optic.id === data.data.id)
        riffles.value.splice(index, 1)
        successMessage(_SUMMARY, t(data.data.message))
      }
    }
  })
  const deleteFunction = (id: number) => {
    _deleteMutation.mutate(id)
  }

  function useRiffleForm(id?: string) {
    const emptyForm: CreateRiffleDto = {
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
      adjustableTriggerMaxWeight: 0,
      adjustableTriggerMinWeight: 0,
      description: '',
      category: getLegalisationCategoryDto(),
      percussionType: getPercussionTypeDto(),
      providedMagazineQuantity: 0,
      barrelSize: 0,
      buttMaterial: null,
      barrelColor: null,
      buttColor: null,
      grenadierSlot: 0,
      isAdjustableBackSight: false,
      isAdjustableBusk: false,
      isAdjustableButt: false,
      isAdjustableFrontSight: false,
      isMlockCompatibility: false,
      isOpenAim: true,
      mLockOptions: null,
      qcSlot: 0,
      railSize: null
    }
    return useFormHandler<CreateRiffleDto, AxiosResponse<RiffleDto>>(
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
    delete: deleteFunction,
    getAllByCategory: getAllRiffleByCategoryQuery,
    getRiffleById: getByIdQuery,
    riffles$: riffles,
    riffle$: riffle,
    getAll: getAllData,
    getI18NPrefix: getI18NPrefix(_I18N_PREFIX),
    formBuilder: useRiffleForm
  }
})
