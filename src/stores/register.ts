import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useApiStore } from '@/stores/api'
import { useMutation } from '@tanstack/vue-query'
import { type CreateUserDto, CreateUserDtoRoleEnum } from '@/api/Api'
import { useToastStore } from '@/stores/toast'

export const useRegisterStore = defineStore('register', () => {
  const _isVisible = ref(false)

  const { api } = useApiStore()
  const { successMessage } = useToastStore()
  const isVisible = computed(() => _isVisible)
  const form = ref({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: 'France',
    phone: '',
    email: '',
    password: '',
    zipCode: '',
    role: CreateUserDtoRoleEnum.USER
  })
  function toggleRegisterDialog() {
    _isVisible.value = !_isVisible.value
  }
  const registerMutation = useMutation({
    mutationFn: (user: CreateUserDto) => {
      return api.api.userControllerRegister(user)
    },
    onSuccess(data) {
      successMessage('register.summary', 'register.success')
      toggleRegisterDialog()
    },
    onError() {
      form.value.email = ''
    }
  })

  return {
    isVisible$: isVisible,
    form$: form,
    toggleRegisterDialog,
    register: registerMutation
  }
})
