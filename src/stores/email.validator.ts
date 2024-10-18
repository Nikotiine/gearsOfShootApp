import { defineStore } from 'pinia'
import { computed } from 'vue'

export const useEmailValidator = defineStore('emailValidator', () => {
  const _email = ''
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  function test(email: string) {
    console.log(regex.test(email))
    return regex.test(email)
  }
  const isValid = computed(() => regex.test(_email))
  return { test, isValidEmail: isValid }
})
