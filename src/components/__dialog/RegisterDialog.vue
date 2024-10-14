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
      <form @submit.prevent="submit">
        <div class="flex items-center gap-4 mb-4">
          <label for="email" class="font-semibold w-24">Email</label>
          <InputText id="email" class="flex-auto" autocomplete="off" v-model="form.email" />
        </div>
        <div class="flex items-center gap-4 mb-8">
          <label for="password" class="font-semibold w-24">Password</label>
          <InputText id="password" class="flex-auto" autocomplete="off" />
        </div>
        <div class="flex justify-end gap-2">
          <Button
            type="button"
            label="Cancel"
            severity="secondary"
            @click="toggleRegisterDialog"
          ></Button>
          <Button type="submit" label="Save"></Button>
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
import { ref } from 'vue'

const { isVisible, toggleRegisterDialog } = useRegisterStore()
const { t } = useI18n()
const form = ref({
  email: ''
})

const submit = () => {
  console.log(form.value.email)
}
</script>

<style scoped></style>
