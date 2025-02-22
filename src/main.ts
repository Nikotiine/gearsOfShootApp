import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueQueryPlugin } from '@tanstack/vue-query'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import ConfirmationService from 'primevue/confirmationservice'
import Aura from '@primevue/themes/aura'
import i18n from '@/i18n'
const app = createApp(App)
import axiosInstance from '../axios.interceptor'
import Tooltip from 'primevue/tooltip'
import KeyFilter from 'primevue/keyfilter'
import { capitalizeDirective } from '@/directive/capitalize.directive'

app.directive('tooltip', Tooltip)
app.directive('keyfilter', KeyFilter)
app.directive('capitalize', capitalizeDirective)
app.use(ConfirmationService)

app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(VueQueryPlugin)
app.use(ToastService)
app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
})
app.config.globalProperties.$axios = axiosInstance
app.mount('#app')
