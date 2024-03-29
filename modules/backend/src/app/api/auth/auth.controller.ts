import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { ConfigService } from '../../core/config/config.service'
import { PrismaService } from '../../core/prisma/prisma.service'
import { AuthLoginBody, AuthLoginRes } from './auth.dto'
import { AuthService } from './auth.service'

@ApiTags('/auth')
@Controller('auth')
export class AuthController {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
    private authSvc: AuthService
  ) {}

  @HttpCode(200)
  @Post('/login')
  async login(@Body() _body: AuthLoginBody): Promise<AuthLoginRes> {
    // const { idTokenClaims } = await this.oauth2Client.fetchIdToken(
    //   body.code,
    //   this.config.auth.redirectUrl
    // )
    const user = await this.authSvc.findUser({
      provider: 'gcc',
      user_friendly_id: 'evelyn_toh@outlook.com',
      sub: 'gcc::evelyn_toh@outlook.com'
    } as any)
    return {
      accessToken: user.id
    }
  }

  // @Post('logout')
  // async logout() {
  // Implement logout functionality here
  // }
}
