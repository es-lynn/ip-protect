import { DynamicModule, Module } from '@nestjs/common'

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
    return {
      module: ConfigModule,
      providers: [opts.envService, opts.configService],
      exports: [opts.configService],
      global: opts.isGlobal ?? false
    }
  }
}
