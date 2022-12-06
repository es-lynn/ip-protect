import { Injectable, UnauthorizedException } from '@nestjs/common'
import { User } from '@prisma/client'

import { IdTokenClaims } from '../../../commons/helpers/oauth2/oauth2-client.types'
import { PrismaService } from '../../core/prisma/prisma.service'

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async findUser(idTokenClaims: IdTokenClaims): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        providerId_provider: {
          provider: idTokenClaims.provider,
          providerId: idTokenClaims.user_friendly_id
        }
      }
    })
    if (!user) {
      throw new UnauthorizedException(`User not found: ${idTokenClaims.sub}`)
    }
    return user
  }
}
