import { Module } from '@nestjs/common'

import { PrismaModule } from '../../../core/prisma/prisma.module'
import { WebpageController } from './webpage.controller'

@Module({
  imports: [PrismaModule],
  controllers: [WebpageController]
})
export class WebpageModule {}
