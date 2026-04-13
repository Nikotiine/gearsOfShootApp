import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api'
import { useQuery } from '@tanstack/vue-query'
import { I18nPrefix } from '@/i18n/i18n-prefix.enum'
import { getAddressDto } from '@/shared/api-dto/get-address.dto'
import type { AddressDto } from '@/api/Api'

export const useAddressStore = defineStore('address-store', () => {
  const { api } = useApiStore()
  const _GET_ALL_FN = 'getAllAddress'
  const _I18N_PREFIX = I18nPrefix.ADDRESS
  const queryFindAllUserAddress = () =>
    useQuery({
      queryKey: [_GET_ALL_FN],
      queryFn: async () => await _fetchAll()
    })

  const _fetchAll = async () => {
    const res = await api.api.addressControllerGetUserAddresses()
    return res.data
  }

  function useAddressForm() {
    const emptyForm: AddressDto = getAddressDto()
  }

  return {
    getAllUserAddress: queryFindAllUserAddress,
    getI18NPrefix: _I18N_PREFIX
  }
})
