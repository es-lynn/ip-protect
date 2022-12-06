import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException
} from '@nestjs/common'

export const AuthUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()
    if (!request.user) {
      throw new UnauthorizedException(
        'Unable to locate User in request. Please login again.'
      )
    }
    return request.user
  }
)
