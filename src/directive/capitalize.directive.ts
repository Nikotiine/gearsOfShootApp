import type { DirectiveBinding } from 'vue'

export const capitalizeDirective = {
  beforeMount(el: HTMLElement, binding: DirectiveBinding) {
    const text = binding.value || ''
    el.textContent = text.charAt(0).toUpperCase() + text.slice(1)
  }
}
