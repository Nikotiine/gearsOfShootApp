import type { HandGunDto, PaginatedResponseDto } from '@/api/Api'

export type GetAllHandgunResponse =
  | (PaginatedResponseDto & {
      data?: HandGunDto[]
    })
  | null
