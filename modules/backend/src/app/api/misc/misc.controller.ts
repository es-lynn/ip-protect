import { Controller, Get, HttpCode, Req } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Request } from 'express'

import { IpAddressRes } from './misc.dto'

@ApiTags('/misc')
@Controller('/misc')
export class MiscController {
  @HttpCode(200)
  @Get('/ip-address')
  async ipAddress(@Req() req: Request): Promise<IpAddressRes> {
    return {
      ipv4: req.ip,
      ipv6: undefined
    }
  }
}
