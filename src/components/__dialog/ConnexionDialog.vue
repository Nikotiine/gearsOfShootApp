<template>
  <div class="card flex justify-center">
    <Dialog
      v-model:visible="isVisible$"
      modal
      :header="t('connexion.title')"
      :style="{ width: '25rem' }"
    >
      <span class="text-surface-500 dark:text-surface-400 block mb-8">{{
        t('connexion.subtitle')
      }}</span>
      <form @submit.prevent="submit">
        <div class="flex items-center gap-4 mb-4">
          <label for="email" class="font-semibold w-24">Email</label>
          <InputText id="email" class="flex-auto mr-4" autocomplete="off" v-model="form$.email" />
        </div>
        <div class="flex items-center gap-4 mb-8">
          <label for="password" class="font-semibold w-24">{{ t('global.password') }}</label>
          <Password
            id="password"
            autocomplete="off"
            v-model="form$.password"
            toggleMask
            :feedback="false"
          />
        </div>
        <div class="flex items-center gap-4 mb-8 text-red-500" v-if="store.login.isError">
          {{ t('error.' + store.login.error.response.data.message) }}
        </div>

        <div class="flex justify-end gap-2">
          <Button
            type="button"
            :label="t('global.cancel')"
            severity="secondary"
            @click="store.toggleConnexionDialog"
          ></Button>
          <Button type="submit" :label="t('connexion.send')" :disabled="!isFormValid"></Button>
        </div>
      </form>
    </Dialog>
  </div>
</template>
<script setup lang="ts">
import { useConnexionStore } from '@/stores/connexion'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import { useEmailValidator } from '@/stores/email.validator'
import { storeToRefs } from 'pinia'
const store = useConnexionStore()
const { isVisible$, form$ } = storeToRefs(store)
const { t } = useI18n()
const { test } = useEmailValidator()

const submit = () => {
  store.login.mutate(form$.value)
}
const isFormValid = computed(() => {
  let isValid: boolean = false
  let isValidEmail = false
  const email = form$.value.email
  if (email.length > 4) {
    isValidEmail = test(form$.value.email)
  }
  if (form$.value.password && isValidEmail && email) {
    isValid = true
  }
  return isValid
})
</script>

<style scoped></style>
