import { Module } from '@nestjs/common'

import { MiscModule } from './misc/misc.module'

@Module({
  imports: [MiscModule],
  controllers: []
})
export class ApiModule {}
