import {
  INestApplication,
  NotImplementedException,
  ValidationPipe
} from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { ConfigService } from '../../app/core/config/config.service'
import { ClassValidationError } from '../errors/ClassValidationError'

function logConfig(app: INestApplication): void {
  const config = app.get(ConfigService)
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

function useGlobalErrorFilter(_app: INestApplication): void {
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
    new DocumentBuilder()
      .setTitle(cfg.title)
      .setVersion(cfg.version)
      .addBearerAuth(
        {
          description: `Enter your Bearer token`,
          name: 'Authorization',
          bearerFormat: 'Bearer',
          scheme: 'Bearer',
          type: 'http',
          in: 'Header'
        },
        'BearerToken'
      )
      .addBasicAuth(
        {
          description: `Enter your username and password`,
          bearerFormat: 'Basic',
          scheme: 'Basic',
          in: 'Header',
          name: 'Authorization',
          type: 'http'
        },
        'BasicToken'
      )
      .build(),
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
