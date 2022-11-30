import { Injectable } from '@nestjs/common'

import { Config } from '../../../commons/config/config.service'
import { EnvService } from '../env/env.service'
import { ConfigSchema } from './config.schema'

@Injectable()
export class ConfigService
  extends Config<ConfigSchema>
  implements ConfigSchema
{
  app: { port: number; dev_mode: boolean }

  constructor(env: EnvService) {
    super()
    this.app = {
      port: env.getOrThrow('APP_PORT'),
      dev_mode: env.getOrThrow('APP_DEV_MODE')
    }
  }
}
