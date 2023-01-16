import { Injectable } from '@nestjs/common'

import { Config } from '../../../commons/config/config.service'
import { EnvService } from '../env/env.service'
import { pkg } from '../package/package'
import { ConfigSchema } from './config.schema'

@Injectable()
export class ConfigService extends Config<ConfigSchema> implements ConfigSchema {
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
  aws: {
    access_key_id: string
    secret_access_key: string
  }
  auth: {
    basicPassword: string
    certUrl: string
    tokenUrl: string
    redirectUrl: string
    clientId: string
    clientSecret: string
  }

  constructor(private env: EnvService) {
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
    this.aws = {
      access_key_id: env.getOrThrow('AWS_ACCESS_KEY_ID'),
      secret_access_key: env.getOrThrow('AWS_SECRET_ACCESS_KEY')
    }
    this.auth = {
      basicPassword: env.getOrThrow('AUTH_BASIC_PASSWORD'),
      certUrl: env.getOrThrow('AUTH_CERT_URL'),
      tokenUrl: env.getOrThrow('AUTH_TOKEN_URL'),
      redirectUrl: env.getOrThrow('AUTH_REDIRECT_URL'),
      clientId: env.getOrThrow('AUTH_CLIENT_ID'),
      clientSecret: env.getOrThrow('AUTH_CLIENT_SECRET')
    }
  }
}
