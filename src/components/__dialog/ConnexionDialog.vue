<script setup lang="ts">
import { useConnexionStore } from '@/stores/connexion'
import InputText from 'primevue/inputtext'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import { useI18n } from 'vue-i18n'
import { useMutation } from '@tanstack/vue-query'
import { AuthenticationService, type UserCredentialDto } from '@/api'
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'

const { isVisible, toggleConnexionDialog } = useConnexionStore()
const { setToken } = useUserStore()
const { t } = useI18n()
const { isError, error, mutate } = useMutation({
  mutationFn: (credential: UserCredentialDto) =>
    AuthenticationService.authControllerLogin(credential),
  onSuccess(data) {
    setToken(data.accessToken)
    toggleConnexionDialog()
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
          {{ t('error.' + error?.body.message) }}
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
