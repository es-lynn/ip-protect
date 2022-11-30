import {
  INestApplication,
  NotImplementedException,
  ValidationPipe
} from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { Config } from '../config/config.service'
import { ClassValidationError } from '../errors/ClassValidationError'
import { Format } from '../utils/Format'

function logConfig(app: INestApplication): void {
  const config = app.get(Config)
  // TODO: Change to logger
  console.info(config)
}

function useClassValidationPipe(app: INestApplication): void {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      exceptionFactory: errors => new ClassValidationError(errors)
    })
  )
}

function useGlobalErrorFilter(app: INestApplication): void {
  throw new NotImplementedException('useGlobalErrorFilter')
}

function useSwagger(
  app: INestApplication,
  cfg: {
    title: string
    version: string
    path: string
  }
): void {
  const document = SwaggerModule.createDocument(
    app,
    new DocumentBuilder().setTitle(cfg.title).setVersion(cfg.version).build(),
    {
      operationIdFactory: (controllerKey, methodKey) => {
        return `${controllerKey
          .split('Controller')[0]
          .toLowerCase()}_${methodKey}`
      }
    }
  )
  SwaggerModule.setup(cfg.path, app, document, {
    swaggerOptions: { defaultModelsExpandDepth: -1 }
  })
}

export const nest = {
  useClassValidationPipe,
  useGlobalErrorFilter,
  useSwagger,
  logConfig
}
