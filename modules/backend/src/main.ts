import { NestFactory } from '@nestjs/core'

import { AppModule } from './app/app.module'
import { ConfigSchema } from './app/core/config/config.schema'
import { ConfigService } from './app/core/config/config.service'
import { nest } from './commons/nest/nest'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule)
  const cfg: ConfigSchema = app.get(ConfigService)

  nest.logConfig(app)

  nest.useClassValidationPipe(app)
  nest.useGlobalErrorFilter(app)

  if (cfg.app.enable_swagger) {
    nest.useSwagger(app, cfg.swagger)
  }

  app.enableCors({ origin: '*' })
  await app.listen(cfg.app.port)
}
bootstrap()
