import { Injectable } from '@nestjs/common'

import { Config } from '../../../commons/config/config.service'
import { EnvService } from '../env/env.service'
import { pkg } from '../package/package'
import { ConfigSchema } from './config.schema'

export class ConfigService
  extends Config<ConfigSchema>
  implements ConfigSchema
{
  app: {
    port: number
    dev_mode: boolean
    enable_swagger: boolean
  }
  swagger: {
    path: string
    title: string
    version: string
  }

  constructor(env: EnvService) {
    super()
    this.app = {
      port: env.getOrThrow('APP_PORT'),
      dev_mode: env.getOrThrow('APP_DEV_MODE'),
      enable_swagger: env.getOrThrow('APP_ENABLE_SWAGGER')
    }
    this.swagger = {
      path: '/swagger/docs',
      title: `API Documentation - IProtect`,
      version: pkg.version
    }
  }
}
