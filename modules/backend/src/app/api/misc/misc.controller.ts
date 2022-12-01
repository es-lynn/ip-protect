import { Controller, Get, HttpCode, Param, Req } from '@nestjs/common'
import { Request } from 'express'

import { Config } from '../../../commons/config/config.service'
import { ConfigSchema } from '../../core/config/config.schema'
import { ConfigService } from '../../core/config/config.service'
import { PrismaService } from '../../core/prisma/prisma.service'
import {
  IpAddressRes,
  MeRes,
  ProjectDetailsParams,
  ProjectDetailsRes
} from './misc.dto'

@Controller('/')
export class MiscController {
  constructor(private prisma: PrismaService) {}

  @HttpCode(200)
  @Get('/misc/ip-address')
  async ipAddress(@Req() req: Request): Promise<IpAddressRes> {
    return {
      ipv4: req.ip,
      ipv6: undefined
    }
  }

  @HttpCode(200)
  @Get('/me/project/list')
  async projectsList(): Promise<MeRes> {
    const me = 'b6862bc4-e1c6-42e5-86af-5044c9799157'
    const projects = await this.prisma.project.findMany({
      where: {
        projectUsers: {
          some: {
            userId: me
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

  // @HttpCode(200)
  // @Get('/project.ip_addresses.list')
  // async project_ipaddresses_list(

  /**
   * misc.ip_address.get
   *
   * project.list
   * GET /projects
   *
   * project.ip_address.list
   * GET /projects/:friendlyId/ip-addresses
   * project.ip_address.add
   * POST /projects/:friendlyId/ip-addresses
   * project.ip_address.edit
   * PUT /projects/:friendlyId/ip-addresses/:id
   * project.ip_address.delete
   * DELETE /projects/:friendlyId/ip-addresses/:id
   *
   * project.webpage.list
   * project.webpage.add
   * project.webpage.edit
   * project.webpage.delete
   *
   * project.user.list
   * GET /projects/:friendlyId/users
   * project.user.add
   * POST /projects/:friendlyId/users
   * project.user.edit_role
   * PUT /projects/:friendlyId/users/:id/role
   * project.user.remove
   * DELETE /projects/:friendlyId/users/:id
   *
   * user.register
   * POST /users/register
   *
   * auth.login
   * POST /auth/login
   * auth.logout
   * POST /auth/logout
   */

  // @HttpCode(200)
  // @Get('/me/project/:friendlyId/details')
  // async projectDetails(
  //   @Param() param: ProjectDetailsParams
  // ): Promise<ProjectDetailsRes> {
  //   const me = 'b6862bc4-e1c6-42e5-86af-5044c9799157'
  //   const project = await this.prisma.project.findUniqueOrThrow({
  //     where: {
  //       friendlyId: param.friendlyId
  //     },
  //     include: {
  //       webpages: true,
  //       projectUsers: {
  //         include: { user: true, ipAddresses: true }
  //       }
  //     }
  //   })
  //   const projectUser = await this.prisma.projectUser.findFirstOrThrow({
  //     where: {
  //       projectId: project.id,
  //       userId: me
  //     },
  //     include: {
  //       ipAddresses: true
  //     }
  //   })
  //   return {
  //     project: {
  //       id: project.id,
  //       friendlyId: project.friendlyId,
  //       me: {
  //         ipAddresses: projectUser.ipAddresses,
  //         isAdmin: projectUser.isAdmin
  //       },
  //       webpages: project.webpages,
  //       users: project.projectUsers.map(it => ({
  //         id: it.user.id,
  //         provider: it.user.provider,
  //         providerId: it.user.providerId,
  //         isAdmin: it.isAdmin,
  //         ipAddresses: projectUser.isAdmin ? it.ipAddresses : undefined
  //       }))
  //     }
  //   }
  // }
}
