import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useRegisterStore = defineStore('register', () => {
  const _isVisible = ref(false)
  const isVisible = computed(() => _isVisible)
  function toggleRegisterDialog() {
    _isVisible.value = !_isVisible.value
  }
  return { isVisible, toggleRegisterDialog }
})
