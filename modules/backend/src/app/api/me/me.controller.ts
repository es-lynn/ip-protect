import { Controller, Get, HttpCode, Req } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { User } from '@prisma/client'
import { Request } from 'express'

import { AuthUser } from '../../core/guards/decorators/AuthUser'
import { UseAuthGuard } from '../../core/guards/decorators/UseAuthGuard'
import { PrismaService } from '../../core/prisma/prisma.service'
import { MeIpAddressRes, MeProjectListRes } from './me.dto'

@UseAuthGuard()
@ApiTags('/me')
@Controller('/me')
export class MeController {
  constructor(private prisma: PrismaService) {}

  @HttpCode(200)
  @Get('/ip-address')
  async ipAddress(@Req() req: Request): Promise<MeIpAddressRes> {
    return {
      ipv4: req.ip,
      ipv6: undefined
    }
  }

  @HttpCode(200)
  @Get('/project/list')
  async projectsList(@AuthUser() me: User): Promise<MeProjectListRes> {
    const projects = await this.prisma.project.findMany({
      where: {
        projectUsers: {
          some: {
            userId: me.id
          }
        }
      }
    })
    return {
      projects: projects.map(proj => ({
        id: proj.id,
        friendlyId: proj.friendlyId
      }))
    }
  }
}
