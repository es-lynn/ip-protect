import { Module } from '@nestjs/common'

import { PrismaModule } from '../../core/prisma/prisma.module'
import { MeController } from './me.controller'

@Module({
  imports: [PrismaModule],
  controllers: [MeController]
})
export class MeModule {}
