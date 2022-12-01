import { DynamicModule, Global, Module } from '@nestjs/common'

import { PrismaModule } from '../prisma/prisma.module'
import { ModelService } from './model.service'

@Module({
  imports: [PrismaModule],
  providers: [ModelService],
  exports: [ModelService]
})
export class ModelModule {}
