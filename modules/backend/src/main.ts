import { NestFactory } from '@nestjs/core'

import { AppModule } from './app/app.module'
import { AppConfigSchema, ConfigSchema } from './app/core/config/config.schema'
import { Config } from './commons/config/config.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const cfg: AppConfigSchema = app.get(Config)
  await app.listen(cfg.app.port)
}
bootstrap()
