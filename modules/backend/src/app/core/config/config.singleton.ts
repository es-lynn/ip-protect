import { EnvService } from '../env/env.service'
import { ConfigService } from './config.service'

export const config = new ConfigService(new EnvService())
