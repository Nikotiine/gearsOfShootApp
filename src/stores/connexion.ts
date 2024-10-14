import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useConnexionStore = defineStore('connexion', () => {
  const _isVisible = ref(false)
  const isVisible = computed(() => _isVisible)
  function toggleConnexionDialog() {
    _isVisible.value = !_isVisible.value
  }
  return { isVisible, toggleConnexionDialog }
})
