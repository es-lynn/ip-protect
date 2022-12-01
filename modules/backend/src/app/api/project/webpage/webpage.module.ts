import { Get, Module, Param } from '@nestjs/common'

import { PrismaModule } from '../../../core/prisma/prisma.module'
import { IpAddressController } from '../ip-address/ip-address.controller'
import { WebpageController } from './webpage.controller'

@Module({
  imports: [PrismaModule],
  controllers: [WebpageController]
})
export class WebpageModule {}
