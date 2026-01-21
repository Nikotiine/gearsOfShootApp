<template>
  <Toast position="bottom-right" />
  <AdminTopBar v-if="isAdmin" />
  <PublicNavigationComponent v-else />
  <ConfirmDialog></ConfirmDialog>
  <div class="h-screen">
    <BreadcrumbView />
    <RouterView />
  </div>

  <!--  <FooterComponent class="" />-->
</template>
<script setup lang="ts">
import { RouterView } from 'vue-router'
import Toast from 'primevue/toast'
import PublicNavigationComponent from '@/components/__app/PublicNavigationComponent.vue'
import ConfirmDialog from 'primevue/confirmdialog'
import BreadcrumbView from '@/views/shared/BreadcrumbView.vue'
import { useUserStore } from '@/stores/user.store'
import AdminTopBar from '@/components/__app/AdminTopBar.vue'
const { isAdmin } = useUserStore()
</script>

<style scoped></style>
