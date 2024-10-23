<template>
  <div class="card flex justify-center">
    <Dialog
      v-model:visible="isVisible"
      modal
      :header="t('register.title')"
      :style="{ width: '35rem' }"
    >
      <span class="text-surface-500 dark:text-surface-400 block mb-8">{{
        t('register.subtitle')
      }}</span>
      <div class="flex items-center gap-4 mb-8 text-red-500" v-if="isError">
        {{ t('error.' + errorMessage) }}
      </div>
      <form @submit.prevent="submit" class="pr-4">
        <div class="flex items-center gap-4 mb-4">
          <label for="firstName" class="font-semibold w-24">{{ t('register.firstName') }}</label>
          <InputText id="firstName" class="flex-auto" autocomplete="off" v-model="form.firstName" />
        </div>
        <div class="flex items-center gap-4 mb-4">
          <label for="lastName" class="font-semibold w-24">{{ t('register.lastName') }}</label>
          <InputText id="lastName" class="flex-auto" autocomplete="off" v-model="form.lastName" />
        </div>
        <div class="flex items-center gap-4 mb-4">
          <label for="address" class="font-semibold w-24">{{ t('register.address') }}</label>
          <InputText id="address" class="flex-auto" autocomplete="off" v-model="form.address" />
        </div>
        <div class="flex items-center gap-4 mb-4">
          <label for="city" class="font-semibold w-24">{{ t('register.city') }}</label>
          <InputText id="city" class="flex-auto" autocomplete="off" v-model="form.city" />
        </div>
        <div class="flex items-center gap-4 mb-4">
          <label for="zipCode" class="font-semibold w-24">{{ t('register.zipCode') }}</label>
          <InputText id="zipCode" class="flex-auto" autocomplete="off" v-model="form.zipCode" />
        </div>
        <div class="flex items-center gap-4 mb-4">
          <label for="state" class="font-semibold w-24">{{ t('register.state') }}</label>
          <InputText
            id="state"
            class="flex-auto"
            disabled
            autocomplete="off"
            v-model="form.state"
          />
        </div>
        <div class="flex items-center gap-4 mb-4">
          <label for="phone" class="font-semibold w-24">{{ t('register.phone') }}</label>
          <InputText id="phone" class="flex-auto" autocomplete="off" v-model="form.phone" />
        </div>

        <div class="flex items-center gap-4 mb-4">
          <label for="email" class="font-semibold w-24">Email</label>
          <InputText id="email" class="flex-auto" autocomplete="off" v-model="form.email" />
        </div>
        <div class="flex items-center gap-4 mb-8">
          <label for="password" class="font-semibold w-24">{{ t('global.password') }}</label>
          <Password
            id="password"
            autocomplete="off"
            class="width-78"
            prompt-label="Entrez votre mot de passe"
            weak-label="trop faible"
            v-model="form.password"
            toggleMask
            :fluid="true"
          />
        </div>
        <div class="flex justify-end gap-2">
          <Button
            type="button"
            label="Cancel"
            severity="secondary"
            @click="toggleRegisterDialog"
          ></Button>
          <Button type="submit" label="Save" :disabled="!isFormValid"></Button>
        </div>
      </form>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import { useRegisterStore } from '@/stores/register'
import { useI18n } from 'vue-i18n'
import { computed, ref } from 'vue'
import { useEmailValidator } from '@/stores/email.validator'
import Password from 'primevue/password'
import { CreateUserDtoRoleEnum, UserDtoRoleEnum } from '@/api/Api'

const { isVisible, toggleRegisterDialog, register, isError, errorMessage } = useRegisterStore()

const { t } = useI18n()
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
const { test } = useEmailValidator()
const isFormValid = computed(() => {
  const email = form.value.email
  let isValidEmail = false
  let isValid = false
  if (email.length > 4) {
    isValidEmail = test(form.value.email)
  }

  if (
    form.value.email &&
    isValidEmail &&
    form.value.password &&
    form.value.firstName &&
    form.value.lastName &&
    form.value.address &&
    form.value.city &&
    form.value.zipCode &&
    form.value.phone
  ) {
    isValid = true
  }
  return isValid
})

const submit = () => {
  register(form.value)
}
</script>

<style scoped>
.width-78 {
  width: 78%;
}
</style>
