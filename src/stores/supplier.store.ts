import { defineStore } from 'pinia'
import { useApiStore } from '@/stores/api'
import { useQuery } from '@tanstack/vue-query'

export const useSupplierStore = defineStore('supplier-store', () => {
  // Appel API
  const { api } = useApiStore()
  // Refs
  // Private Attibute

  const _GET_ALL_FN = 'getAllSuppliers'
  // *******************Methodes***************
  const getAllQuery = () =>
    useQuery({
      queryKey: [_GET_ALL_FN],
      queryFn: async () => _fetchAll()
    })
  const _fetchAll = async () => {
    const res = await api.api.supplierControllerFindAll()
    return res.data
  }
  return {
    getAll: getAllQuery
  }
})
