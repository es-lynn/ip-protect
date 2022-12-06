import {
  applyDecorators,
  CacheInterceptor,
  CacheKey,
  CacheTTL,
  UseGuards,
  UseInterceptors
} from '@nestjs/common'
import { ApiBasicAuth, ApiBearerAuth } from '@nestjs/swagger'

import { AuthGuard } from '../auth-guard'

export function UseAuthGuard(): MethodDecorator & ClassDecorator {
  return applyDecorators(
    ApiBearerAuth('BearerToken'),
    ApiBasicAuth('BasicToken'),
    UseGuards(AuthGuard)
  )
}
