<template>
  <header>
    <div class="card">
      <MegaMenu :model="items" class="p-4 bg-surface-0" style="border-radius: 0.5rem">
        <template #start>
          <svg
            width="35"
            height="40"
            viewBox="0 0 35 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="h-8"
          >
            <path
              d="M25.87 18.05L23.16 17.45L25.27 20.46V29.78L32.49 23.76V13.53L29.18 14.73L25.87 18.04V18.05ZM25.27 35.49L29.18 31.58V27.67L25.27 30.98V35.49ZM20.16 17.14H20.03H20.17H20.16ZM30.1 5.19L34.89 4.81L33.08 12.33L24.1 15.67L30.08 5.2L30.1 5.19ZM5.72 14.74L2.41 13.54V23.77L9.63 29.79V20.47L11.74 17.46L9.03 18.06L5.72 14.75V14.74ZM9.63 30.98L5.72 27.67V31.58L9.63 35.49V30.98ZM4.8 5.2L10.78 15.67L1.81 12.33L0 4.81L4.79 5.19L4.8 5.2ZM24.37 21.05V34.59L22.56 37.29L20.46 39.4H14.44L12.34 37.29L10.53 34.59V21.05L12.42 18.23L17.45 26.8L22.48 18.23L24.37 21.05ZM22.85 0L22.57 0.69L17.45 13.08L12.33 0.69L12.05 0H22.85Z"
              fill="var(--p-primary-color)"
            />
            <path
              d="M30.69 4.21L24.37 4.81L22.57 0.69L22.86 0H26.48L30.69 4.21ZM23.75 5.67L22.66 3.08L18.05 14.24V17.14H19.7H20.03H20.16H20.2L24.1 15.7L30.11 5.19L23.75 5.67ZM4.21002 4.21L10.53 4.81L12.33 0.69L12.05 0H8.43002L4.22002 4.21H4.21002ZM21.9 17.4L20.6 18.2H14.3L13 17.4L12.4 18.2L12.42 18.23L17.45 26.8L22.48 18.23L22.5 18.2L21.9 17.4ZM4.79002 5.19L10.8 15.7L14.7 17.14H14.74H15.2H16.85V14.24L12.24 3.09L11.15 5.68L4.79002 5.2V5.19Z"
              fill="var(--p-text-color)"
            />
          </svg>
        </template>
        <template #item="{ item }">
          <a
            v-if="item.root"
            class="flex items-center cursor-pointer px-4 py-2 overflow-hidden relative font-semibold text-lg uppercase"
            style="border-radius: 2rem"
          >
            <span>{{ t(i18nPrefix + item.label) }}</span>
          </a>
          <a v-else-if="!item.image" class="flex items-center p-4 cursor-pointer mb-2 gap-3">
            <span
              class="inline-flex items-center justify-center rounded-full bg-primary text-primary-contrast w-12 h-12"
            >
              <i :class="[item.icon, 'text-lg']"></i>
            </span>
            <span class="inline-flex flex-col gap-1">
              <span class="font-bold text-lg">{{ t(i18nPrefix + item.label) }}</span>
              <span class="whitespace-nowrap">{{ t(i18nPrefix + item.subtext) }}</span>
            </span>
          </a>
          <div v-else class="flex flex-col items-start gap-4 p-2">
            <img alt="megamenu-demo" :src="item.image" class="w-full" />
            <span>{{ item.subtext }}</span>
            <Button :label="item.label" outlined />
          </div>
        </template>
        <template #end>
          <div class="flex items-center gap-2">
            <SearchInput />
            <!--            <LanguageSplitButton />-->
            <InvoiceButtonComponent v-if="isAdmin" />
            <div v-if="!isLogged">
              <ConnexionSplitButton />
            </div>
            <div class="" v-else>
              <ConnectedSplitButton />
            </div>
          </div>
        </template>
      </MegaMenu>
    </div>
  </header>
  <ConnexionDialog />
  <RegisterDialog />
</template>
<script setup lang="ts">
import { computed } from 'vue'
import MegaMenu from 'primevue/megamenu'
import Button from 'primevue/button'
import SearchInput from '@/components/__layout/SearchInput.vue'
import ConnexionDialog from '@/components/__dialog/ConnexionDialog.vue'
import { useI18n } from 'vue-i18n'
import RegisterDialog from '@/components/__dialog/RegisterDialog.vue'
import { useSecurityStore } from '@/stores/security.store'
import ConnexionSplitButton from '@/components/__layout/ConnexionSplitButton.vue'
import ConnectedSplitButton from '@/components/__layout/ConnectedSplitButton.vue'
import { useRouter } from 'vue-router'
import InvoiceButtonComponent from '@/components/__invoice/InvoiceButtonComponent.vue'
import { useUserStore } from '@/stores/user.store'
import { PublicRouterEnum } from '@/enum/router/public-router.enum'
import { I18nPrefix } from '@/i18n/i18n-prefix.enum'

const { push } = useRouter()
const { t } = useI18n()
const { isLogged } = useSecurityStore()
const { isAdmin } = useUserStore()
const i18nPrefix = I18nPrefix.TOPBAR
const items = computed(() => {
  const baseItems = [
    {
      label: 'sportShooting',
      root: true,
      items: [
        [
          {
            items: [
              {
                label: 'categoryC',
                icon: 'pi pi-list',
                subtext: 'subRiffleCatC',
                command: () => {
                  push({ name: PublicRouterEnum.PUBLIC_RIFFLE_LIST, params: { category: 'C' } })
                }
              },
              {
                label: 'categoryCHandgun',
                icon: 'pi pi-question',
                subtext: 'subHandgunCatC',
                command: () => {
                  push({ name: PublicRouterEnum.PUBLIC_HANDGUN_LIST, params: { category: 'B' } })
                }
              },
              {
                label: 'ammoC',
                icon: 'pi pi-users',
                subtext: 'subAmmoCatC',
                command: () => {
                  push({ name: PublicRouterEnum.PUBLIC_AMMUNITION_LIST, params: { category: 'C' } })
                }
              },
              {
                label: 'magazine',
                icon: 'pi pi-file',
                subtext: 'subMagazineCatC',
                command: () => {
                  push({ name: PublicRouterEnum.PUBLIC_MAGAZINE_LIST, params: { category: 'C' } })
                }
              }
            ]
          }
        ],
        [
          {
            items: [
              {
                label: 'categoryBRiffle',
                icon: 'pi pi-shield',
                subtext: 'subRiffleCatB',
                command: () => {
                  push({ name: PublicRouterEnum.PUBLIC_RIFFLE_LIST, params: { category: 'B' } })
                }
              },
              {
                label: 'categoryBHandgun',
                icon: 'pi pi-question',
                subtext: 'subHandgunCatB',
                command: () => {
                  push({ name: PublicRouterEnum.PUBLIC_HANDGUN_LIST, params: { category: 'B' } })
                }
              },
              {
                label: 'ammoB',
                icon: 'pi pi-search',
                subtext: 'subAmmoCatB',
                command: () => {
                  push({ name: PublicRouterEnum.PUBLIC_AMMUNITION_LIST, params: { category: 'B' } })
                }
              },
              {
                label: 'magazine',
                icon: 'pi pi-file',
                subtext: 'subMagazineCatB',
                command: () => {
                  push({ name: PublicRouterEnum.PUBLIC_MAGAZINE_LIST, params: { category: 'B' } })
                }
              }
            ]
          }
        ],
        [
          {
            items: [
              /*  {
                label: 'optic',
                icon: 'pi pi-comments',
                subtext: 'subOptic',
                command: () => {
                  push({ name: PublicRouterEnum.PUBLIC_OPTIC_LIST })
                }
              },
              {
                label: 'opticCollar',
                icon: 'pi pi-star',
                subtext: 'subOpticCollar',
                command: () => {
                  push({ name: PublicRouterEnum.PUBLIC_OPTIC_COLLAR_LIST })
                }
              },
              {
                label: 'rds',
                icon: 'pi pi-star',
                subtext: 'subOpticRds',
                command: () => {
                  push({ name: PublicRouterEnum.PUBLIC_RDS_LIST })
                }
              }*/
            ]
          }
        ]
      ]
    },
    {
      label: 'recreationalShooting',
      root: true,
      items: [
        [
          {
            items: [
              {
                label: 'airgunRiffle',
                icon: 'pi pi-comments',
                subtext: 'subAirgunRiffle',
                disabled: true,
                command: () => {
                  //push({ name: PublicRouterEnum.PUBLIC_OPTIC_LIST })
                }
              },
              {
                label: 'airgunHandgun',
                icon: 'pi pi-comments',
                subtext: 'subAirgunHandgun',
                disabled: true,
                command: () => {
                  // push({ name: PublicRouterEnum.PUBLIC_OPTIC_LIST })
                }
              }
            ]
          }
        ],
        [
          {
            items: [
              {
                label: 'airsoftRiffle',
                icon: 'pi pi-star',
                subtext: 'subAirsoftRiffle',
                disabled: true,
                command: () => {
                  // push({ name: PublicRouterEnum.PUBLIC_OPTIC_COLLAR_LIST })
                }
              },
              {
                label: 'airsoftHandgun',
                icon: 'pi pi-star',
                subtext: 'subOpticCollar',
                disabled: true,
                command: () => {
                  // push({ name: PublicRouterEnum.PUBLIC_OPTIC_COLLAR_LIST })
                }
              }
            ]
          }
        ],
        [
          {
            items: [
              {
                label: 'ammunitionAirgun',
                icon: 'pi pi-star',
                subtext: 'subOpticCollar',
                disabled: true,
                command: () => {
                  // push({ name: PublicRouterEnum.PUBLIC_OPTIC_COLLAR_LIST })
                }
              },
              {
                label: 'ammunitionAirsoft',
                icon: 'pi pi-star',
                subtext: 'subOpticCollar',
                disabled: true,
                command: () => {
                  // push({ name: PublicRouterEnum.PUBLIC_OPTIC_COLLAR_LIST })
                }
              },
              {
                label: 'co2',
                icon: 'pi pi-star',
                subtext: 'subCo2r',
                disabled: true,
                command: () => {
                  // push({ name: PublicRouterEnum.PUBLIC_OPTIC_COLLAR_LIST })
                }
              }
            ]
          }
        ]
      ]
    },
    {
      label: 'optics',
      root: true,
      items: [
        [
          {
            items: [
              {
                label: 'optic',
                icon: 'pi pi-comments',
                subtext: 'subOptic',
                command: () => {
                  push({ name: PublicRouterEnum.PUBLIC_OPTIC_LIST })
                }
              },
              {
                label: 'opticCollar',
                icon: 'pi pi-star',
                subtext: 'subOpticCollar',
                command: () => {
                  push({ name: PublicRouterEnum.PUBLIC_OPTIC_COLLAR_LIST })
                }
              },
              {
                label: 'opticRail',
                icon: 'pi pi-star',
                subtext: 'subOpticRail',
                disabled: true,
                command: () => {
                  // push({ name: PublicRouterEnum.PUBLIC_OPTIC_COLLAR_LIST })
                }
              }
            ]
          }
        ],
        [
          {
            items: [
              {
                label: 'opticCleaning',
                icon: 'pi pi-comments',
                subtext: 'subOpticCleaning',
                disabled: true,
                command: () => {
                  // push({ name: PublicRouterEnum.PUBLIC_OPTIC_LIST })
                }
              }
            ]
          }
        ]
      ]
    },
    {
      label: 'accessories',
      root: true,
      items: [
        [
          {
            items: [
              {
                label: 'rds',
                icon: 'pi pi-star',
                subtext: 'subRds',
                command: () => {
                  push({ name: PublicRouterEnum.PUBLIC_RDS_LIST })
                }
              },
              {
                label: 'riffleParts',
                icon: 'pi pi-star',
                subtext: 'subRiffleParts',
                disabled: true,
                command: () => {
                  // push({ name: PublicRouterEnum.PUBLIC_RDS_LIST })
                }
              },
              {
                label: 'bipod',
                icon: 'pi pi-star',
                subtext: 'subBipod',
                disabled: true,
                command: () => {
                  // push({ name: PublicRouterEnum.PUBLIC_RDS_LIST })
                }
              },
              {
                label: 'grip',
                icon: 'pi pi-star',
                subtext: 'subGrip',
                disabled: true,
                command: () => {
                  // push({ name: PublicRouterEnum.PUBLIC_RDS_LIST })
                }
              }
            ]
          }
        ],
        [
          {
            items: [
              {
                label: 'weaponsCleaning',
                icon: 'pi pi-star',
                subtext: 'subWeaponsCleaning',
                disabled: true,
                command: () => {
                  // push({ name: PublicRouterEnum.PUBLIC_RDS_LIST })
                }
              },
              {
                label: 'weaponsCase',
                icon: 'pi pi-star',
                subtext: 'subWeaponsCase',
                disabled: true,
                command: () => {
                  // push({ name: PublicRouterEnum.PUBLIC_RDS_LIST })
                }
              }
            ]
          }
        ],
        [
          {
            items: [
              {
                label: 'target',
                icon: 'pi pi-star',
                subtext: 'subTarget',
                disabled: true,
                command: () => {
                  // push({ name: PublicRouterEnum.PUBLIC_RDS_LIST })
                }
              },
              {
                label: 'shooterAcc',
                icon: 'pi pi-star',
                subtext: 'subShooterAcc',
                disabled: true,
                command: () => {
                  // push({ name: PublicRouterEnum.PUBLIC_RDS_LIST })
                }
              }
            ]
          }
        ]
      ]
    },
    {
      label: 'reloading',
      root: true,
      items: [
        [
          {
            items: [
              {
                label: 'ammunitionHead',
                icon: 'pi pi-comments',
                subtext: 'subAmmunitionHead',
                disabled: true,
                command: () => {
                  // push({ name: PublicRouterEnum.PUBLIC_OPTIC_LIST })
                }
              },
              {
                label: 'ammunitionBody',
                icon: 'pi pi-star',
                subtext: 'subAmmunitionBody',
                disabled: true,
                command: () => {
                  //push({ name: PublicRouterEnum.PUBLIC_OPTIC_COLLAR_LIST })
                }
              },
              {
                label: 'powder',
                icon: 'pi pi-star',
                subtext: 'subPowder',
                disabled: true,
                command: () => {
                  // push({ name: PublicRouterEnum.PUBLIC_OPTIC_COLLAR_LIST })
                }
              },
              {
                label: 'primer',
                icon: 'pi pi-star',
                subtext: 'subPrimer',
                disabled: true,
                command: () => {
                  // push({ name: PublicRouterEnum.PUBLIC_OPTIC_COLLAR_LIST })
                }
              }
            ]
          }
        ],
        [
          {
            items: [
              {
                label: 'reloadingGear',
                icon: 'pi pi-comments',
                subtext: 'subReloadingGear',
                disabled: true,
                command: () => {
                  // push({ name: PublicRouterEnum.PUBLIC_OPTIC_LIST })
                }
              }
            ]
          }
        ]
      ]
    }
  ]

  return baseItems
})
</script>

<style scoped></style>
