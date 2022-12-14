import { DynamicModule, Module } from '@nestjs/common'

import { ConfigService } from '../../app/core/config/config.service'
import { Env } from '../env/env'
import { Class } from '../types/Class'
import { Config } from './config.service'

@Module({})
export class ConfigModule {
  static register(opts: {
    isGlobal?: boolean
    envService: Class<Env<any>>
    configService: Class<Config<any>>
  }): DynamicModule {
    const factory = {
      provide: ConfigService,
      useFactory: () => {
        return new opts.configService(new opts.envService())
      }
    }
    return {
      module: ConfigModule,
      providers: [factory],
      exports: [factory],
      global: opts.isGlobal ?? false
    }
  }
}
