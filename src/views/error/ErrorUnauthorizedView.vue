<template>
  <div class="flex flex-col items-center justify-center min-h-screen text-gray-700 p-6">
    <Card class="shadow-xl w-full max-w-md text-center">
      <template #title>
        <div class="flex flex-col items-center justify-center">
          <div class="text-8xl font-bold text-primary mb-2">403</div>
          <h1 class="text-2xl font-semibold mb-4">Accès refusé</h1>
        </div>
      </template>

      <template #content>
        <p class="text-gray-500 mb-6">
          Vous n’avez pas l’autorisation d’accéder à cette page.<br />
          Si vous pensez qu’il s’agit d’une erreur, veuillez contacter un administrateur.
        </p>
        <Button
          label="Retour à l'accueil"
          icon="pi pi-home"
          class="p-button-outlined p-button-primary"
          @click="goHome"
        />
      </template>
    </Card>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
import Card from 'primevue/card'
import Button from 'primevue/button'
import { RouterEnum } from '@/enum/router.enum'

const router = useRouter()

const goHome = () => {
  router.push({ name: RouterEnum.HOME })
}
</script>

<style scoped>
.text-primary {
  @apply text-blue-600;
}
</style>
