import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useMutation } from '@tanstack/vue-query'
import type { UserCredentialDto } from '@/api/Api'
import { useApiStore } from '@/stores/api'
import { useSecurityStore } from '@/stores/shared/security.store'
import { useToastStore } from '@/stores/shared/toast'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user.store'
import { AdminRouterEnum } from '@/enum/router/admin-router.enum'
import { I18nPrefix } from '@/i18n/i18n-prefix.enum'

/**
 * 📦 Store de gestion de la connexion utilisateur (`useConnexionStore`).
 *
 * Ce store centralise toute la logique liée à la **connexion utilisateur** :
 * - Gestion de l’état du formulaire d’authentification.
 * - Appel API au backend pour la connexion.
 * - Stockage du token JWT en local.
 * - Récupération du profil utilisateur.
 * - Redirection conditionnelle selon le rôle (admin ou non).
 * - Gestion de la visibilité de la fenêtre de connexion.
 *
 * ---
 * 🔐 **Flux de connexion complet :**
 * 1. L’utilisateur saisit son email et son mot de passe.
 * 2. Le store envoie ces informations via `authControllerLogin`.
 * 3. Le token JWT retourné est sauvegardé par `setToken`.
 * 4. Le profil utilisateur est récupéré via `getUserProfile`.
 * 5. Si l’utilisateur est admin (`isAdmin`), il est redirigé vers le tableau de bord admin.
 * 6. La boîte de dialogue de connexion est fermée et un message de succès est affiché.
 *
 * ---
 * ⚠️ **Gestion des erreurs :**
 * En cas d’échec de la connexion, le mot de passe du formulaire est automatiquement réinitialisé.
 *
 * ---
 * @returns {object} Store Pinia exposant les propriétés et actions suivantes :
 *
 * @property {Ref<boolean>} isVisible$ - Indique si la boîte de dialogue de connexion est visible.
 *
 * @property {Function} toggleConnexionDialog - Bascule l’état de visibilité de la boîte de dialogue.
 *
 * @property {UseMutationResult<AxiosResponse<{ accessToken: string }>, Error, UserCredentialDto>} login -
 * Mutation TanStack Query permettant d’effectuer la connexion :
 * - `mutationFn` : Appelle l’API de connexion.
 * - `onSuccess` : Stocke le token, récupère le profil, redirige si admin, ferme la modale.
 * - `onError` : Réinitialise le champ mot de passe.
 *
 * @property {Ref<{ email: string; password: string }>} form$ - État réactif du formulaire de connexion.
 *
 * ---
 * 🧩 **Dépendances :**
 * - `useSecurityStore` → Gère le stockage du token JWT.
 * - `useUserStore` → Fournit `getUserProfile()` et `isAdmin`.
 * - `useApiStore` → Fournit l’accès aux endpoints backend (`api.api.authControllerLogin`).
 * - `useToastStore` → Affiche les messages de succès ou d’erreur.
 * - `useRouter` → Permet la redirection post-authentification.
 *
 * ---
 * 💡 **Exemple d’utilisation :**
 * ```ts
 * const connexionStore = useConnexionStore()
 * connexionStore.form$.email = 'user@mail.com'
 * connexionStore.form$.password = 'secret'
 * connexionStore.login.mutate(connexionStore.form$)
 * ```
 */
export const useConnexionStore = defineStore('connexion', () => {
  const { setToken } = useSecurityStore()
  const { getUserProfile, isAdmin } = useUserStore()
  const isVisible = ref(false)
  const router = useRouter()
  const form = ref({
    email: '',
    password: ''
  })
  const { api } = useApiStore()
  const { successMessage } = useToastStore()
  function toggleConnexionDialog() {
    isVisible.value = !isVisible.value
  }

  /**
   * Mutation de connexion utilisateur via TanStack Query.
   *
   * Cette mutation gère tout le processus d’authentification :
   * 1. Envoie les identifiants au backend (`authControllerLogin`).
   * 2. Récupère et stocke le token JWT.
   * 3. Affiche un message de succès.
   * 4. Récupère le profil utilisateur pour vérifier le rôle.
   * 5. Redirige vers le tableau de bord admin si l’utilisateur est administrateur.
   * 6. Ferme la fenêtre de dialogue de connexion.
   *
   * En cas d’erreur, le mot de passe est simplement réinitialisé dans le formulaire.
   *
   * @property {Function} mutationFn - Fonction de mutation qui envoie les identifiants de l'utilisateur
   * à l'API backend pour obtenir un token JWT.
   *
   * @param {UserCredentialDto} credential - Objet contenant l'email et le mot de passe de l'utilisateur.
   *
   * @property {Function} onSuccess - Callback exécuté lorsque la connexion réussit :
   * - Stocke le token JWT via `setToken`.
   * - Affiche un message de succès.
   * - Appelle `getUserProfile` pour récupérer les informations de l'utilisateur connecté.
   * - Redirige vers le tableau de bord administrateur si l'utilisateur est admin.
   * - Ferme la boîte de dialogue de connexion.
   *
   * @property {Function} onError - Callback exécuté si la connexion échoue :
   * - Réinitialise le champ mot de passe du formulaire.
   */
  const loginMutation = useMutation({
    mutationFn: async (credential: UserCredentialDto) => {
      return await api.api.authControllerLogin(credential)
    },
    onSuccess: async (res) => {
      await setToken(res.data.accessToken)
      successMessage('connexion.summary', `connexion.login.success`)
      await getUserProfile()
      if (isAdmin.value) {
        await router.push({ name: AdminRouterEnum.ADMIN_DASHBOARD })
      }
      toggleConnexionDialog()
    },
    onError() {
      form.value.password = ''
    }
  })

  return {
    isVisible$: isVisible,
    toggleConnexionDialog,
    login: loginMutation,
    form$: form,
    getI18nPrefix: I18nPrefix.CONNEXION
  }
})
