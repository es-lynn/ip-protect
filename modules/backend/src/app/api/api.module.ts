import { Module } from '@nestjs/common'

import { AuthModule } from './auth/auth.module'
import { MeModule } from './me/me.module'
import { IpAddressModule } from './project/ip-address/ip-address.module'
import { UserModule } from './project/user/user.module'
import { WebpageModule } from './project/webpage/webpage.module'

@Module({
  imports: [MeModule, IpAddressModule, WebpageModule, AuthModule, UserModule],
  controllers: []
})
export class ApiModule {}
