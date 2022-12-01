import { Module } from '@nestjs/common'

import { MiscModule } from './misc/misc.module'
import { IpAddressModule } from './project/ip-address/ip-address.module'
import { WebpageModule } from './project/webpage/webpage.module'

@Module({
  imports: [MiscModule, IpAddressModule, WebpageModule],
  controllers: []
})
export class ApiModule {}
