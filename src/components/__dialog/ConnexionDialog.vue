<script setup lang="ts">
import { useConnexionStore } from '@/stores/connexion'
import InputText from 'primevue/inputtext'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import { useI18n } from 'vue-i18n'
import { useMutation } from '@tanstack/vue-query'
import { ref } from 'vue'
import { useSecurityStore } from '@/stores/security'
import { useToastStore } from '@/stores/toast'
import { useUserStore } from '@/stores/user'
import type { UserCredentialDto } from '@/api/Api'
import { useApiStore } from '@/stores/api'

const { isVisible, toggleConnexionDialog } = useConnexionStore()
const { setToken } = useSecurityStore()
const { successMessage } = useToastStore()
const { getUserProfile } = useUserStore()
const { api } = useApiStore()
const { t } = useI18n()
const errorMessage = ref('')
const { isError, error, mutate } = useMutation({
  mutationFn: async (credential: UserCredentialDto) => {
    return await api.api.authControllerLogin(credential)
  },
  onSuccess(res) {
    setToken(res.data.accessToken)
    successMessage('Connexion', `Connexion reussie`)
    api.api.authControllerMe()
    toggleConnexionDialog()
  },
  onError(error: any) {
    console.log(error)
    errorMessage.value = error.response.data.message
  }
})
const form = ref({
  email: '',
  password: ''
})
const submit = () => {
  mutate(form.value)
}
</script>

<template>
  <div class="card flex justify-center">
    <Dialog
      v-model:visible="isVisible"
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
          <InputText id="email" class="flex-auto" autocomplete="off" v-model="form.email" />
        </div>
        <div class="flex items-center gap-4 mb-8">
          <label for="password" class="font-semibold w-24">{{ t('global.password') }}</label>
          <InputText id="password" class="flex-auto" autocomplete="off" v-model="form.password" />
        </div>
        <div class="flex items-center gap-4 mb-8 text-red-500" v-if="isError">
          {{ t('error.' + errorMessage) }}
        </div>

        <div class="flex justify-end gap-2">
          <Button
            type="button"
            :label="t('global.cancel')"
            severity="secondary"
            @click="toggleConnexionDialog"
          ></Button>
          <Button type="submit" :label="t('connexion.send')"></Button>
        </div>
      </form>
    </Dialog>
  </div>
</template>

<style scoped></style>
