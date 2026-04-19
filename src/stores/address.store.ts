import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api'
import { useMutation, useQuery } from '@tanstack/vue-query'
import { I18nPrefix } from '@/i18n/i18n-prefix.enum'
import { getAddressDto } from '@/shared/api-dto/get-address.dto'
import type { AddressDto } from '@/api/Api'
import { I18NSuffix } from '@/enum/I18NSuffix.enum'
import { useToastStore } from '@/stores/shared/toast'
import { useFormHandler } from '@/shared/useFormHandler'
import type { AxiosResponse } from 'axios'

export const useAddressStore = defineStore('address-store', () => {
  const { api } = useApiStore()
  const _GET_ALL_FN = 'getAllAddress'
  const _GET_BY_ID_FN = 'getAddressById'
  const _I18N_PREFIX = I18nPrefix.ADDRESS
  const toastStore = useToastStore()
  const queryFindAllUserAddress = () =>
    useQuery({
      queryKey: [_GET_ALL_FN],
      queryFn: async () => await _fetchAll()
    })

  const _fetchAll = async () => {
    const res = await api.api.addressControllerGetUserAddresses()
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
    const res = await api.api.addressControllerGetById(parseInt(id))
    return res.data
  }
  const _createMutation = useMutation({
    mutationFn: async (address: AddressDto) => {
      return await api.api.addressControllerInsertUserAddress(address)
    }
  })

  const _updateMutation = useMutation({
    mutationFn: async (address: AddressDto) => {
      return await api.api.addressControllerUpdate(address.id, address)
    },
    onError(error: any) {
      toastStore.errorMessage(
        _I18N_PREFIX + I18NSuffix.SUMMARY,
        'error.' + error.response.data.message
      )
    }
  })

  function useAddressForm(id?: string) {
    const emptyForm: AddressDto = getAddressDto()
    return useFormHandler<AddressDto, AxiosResponse<AddressDto>>(
      emptyForm,
      getByIdQuery,
      _createMutation,
      _updateMutation,
      _I18N_PREFIX,
      _GET_BY_ID_FN,
      _GET_ALL_FN,
      id,
      (data) => ({
        ...data
      })
    )
  }

  return {
    getAllUserAddress: queryFindAllUserAddress,
    getI18NPrefix: _I18N_PREFIX,
    formBuilder: useAddressForm
  }
})
