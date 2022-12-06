import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common'
import { str } from 'src/commons/utils/StringUtil'

import { ConfigService } from '../config/config.service'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private prisma: PrismaService, private config: ConfigService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest()
    const session = req.session

    // /** Bearer */
    // if (req.headers.authorization?.startsWith('Bearer')) {
    //   const [, accessToken] = req.headers.authorization.split('Bearer ')
    //   req.user = await this.prisma.user.findUniqueOrThrow({
    //     where: { id: accessToken }
    //   })
    /** Basic */
    if (req.headers.authorization?.startsWith('Basic')) {
      const [, base64] = req.headers.authorization.split('Basic ')
      const [username, password] = str.base64Decode(base64).split(':')
      if (password !== this.config.auth.basicPassword) {
        throw new UnauthorizedException('Incorrect password')
      }
      const user = await this.prisma.user.findUnique({
        where: { id: username }
      })
      if (!user) {
        throw new UnauthorizedException(`No such user exists: ${username}`)
      }
      req.user = user
      /** Session */
    } else if (req.session?.user) {
      req.user = session.user
      /** Not logged in */
    } else {
      throw new UnauthorizedException('No current user found. Please log in.')
    }

    return true
  }
}
