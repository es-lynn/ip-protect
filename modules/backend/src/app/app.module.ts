import { Module } from '@nestjs/common'

import { ConfigModule } from '../commons/config/config.module'
import { ApiModule } from './api/api.module'
import { ConfigService } from './core/config/config.service'
import { EnvService } from './core/env/env.service'
import { AuthGuardModule } from './core/guards/auth-guard.module'

@Module({
  imports: [
    ConfigModule.register({
      envService: EnvService,
      configService: ConfigService,
      isGlobal: true
    }),
    AuthGuardModule.register({
      isGlobal: true
    }),
    ApiModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
