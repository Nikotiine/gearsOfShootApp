import { createI18n } from 'vue-i18n'
import en from './locale/en.json'
import fr from './locale/fr.json'

export default createI18n({
  locale: 'fr',
  fallbackLocale: 'en',
  messages: {
    en,
    fr
  }
})
