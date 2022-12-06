import { Module } from '@nestjs/common'

import { ModelModule } from '../../../core/model/model.module'
import { PrismaModule } from '../../../core/prisma/prisma.module'
import { IpAddressController } from './ip-address.controller'

@Module({
  imports: [PrismaModule, ModelModule],
  controllers: [IpAddressController]
})
export class IpAddressModule {}
