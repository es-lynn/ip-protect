import { Injectable } from '@nestjs/common'

import { Env } from '../../../commons/env/env'
import { EnvSchema } from './env.schema'

@Injectable()
export class EnvService extends Env<EnvSchema> {
  constructor() {
    super(EnvSchema)
  }
}
