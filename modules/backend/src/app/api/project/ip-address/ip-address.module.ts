import { Get, Module } from '@nestjs/common'

import { PrismaModule } from '../../../core/prisma/prisma.module'
import { IpAddressController } from './ip-address.controller'

@Module({
  imports: [PrismaModule],
  controllers: [IpAddressController]
})
export class IpAddressModule {}
