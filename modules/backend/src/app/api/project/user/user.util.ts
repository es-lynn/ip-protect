import { ProjectUser, User } from '@prisma/client'

import { User as UserDto } from '../_dto/dto'

export function mapToUserDto(projUser: ProjectUser & { user: User }): UserDto {
  return {
    id: projUser.user.id,
    name: projUser.user.name,
    provider: projUser.user.provider,
    providerId: projUser.user.providerId,
    isAdmin: projUser.isAdmin
  }
}
