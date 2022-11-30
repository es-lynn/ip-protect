import { Module } from '@nestjs/common'

import { ConfigModule } from '../commons/config/config.module'
import { ApiModule } from './api/api.module'
import { ConfigService } from './core/config/config.service'
import { EnvService } from './core/env/env.service'

@Module({
  imports: [
    ConfigModule.register({
      envService: EnvService,
      configService: ConfigService,
      isGlobal: true
    }),
    ApiModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
