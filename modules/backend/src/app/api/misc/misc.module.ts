import { Get, Module } from '@nestjs/common'

import { PrismaModule } from '../../core/prisma/prisma.module'
import { MiscController } from './misc.controller'

@Module({
  imports: [PrismaModule],
  controllers: [MiscController]
})
export class MiscModule {}
