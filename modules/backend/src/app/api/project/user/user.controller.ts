import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { PrismaService } from '../../../core/prisma/prisma.service'
import { EditParam } from '../webpage/webpage.dto'
import {
  AddBody,
  AddParam,
  AddRes,
  EditRoleBody,
  EditRoleParam,
  EditRoleRes,
  ListParam,
  ListRes,
  RemoveParam,
  RemoveRes
} from './user.dto'
import { mapToUserDto } from './user.util'

@ApiTags('/project/:projectFriendlyId/user')
@Controller('/project/:projectFriendlyId/user')
export class UserController {
  constructor(private prisma: PrismaService) {}

  @HttpCode(200)
  @Get('/list')
  async list(@Param() param: ListParam): Promise<ListRes> {
    const { projectUsers } = await this.prisma.project.findUniqueOrThrow({
      where: {
        friendlyId: param.projectFriendlyId
      },
      include: {
        projectUsers: {
          include: { user: true }
        }
      }
    })

    return {
      users: projectUsers.map(mapToUserDto)
    }
  }

  @HttpCode(201)
  @Post('/add')
  async add(@Param() param: AddParam, @Body() body: AddBody): Promise<AddRes> {
    const project = await this.prisma.project.findUniqueOrThrow({
      where: { friendlyId: param.projectFriendlyId }
    })
    const projUser = await this.prisma.projectUser.create({
      data: {
        userId: body.id,
        isAdmin: body.isAdmin,
        projectId: project.id
      },
      include: { user: true }
    })

    return { user: mapToUserDto(projUser) }
  }

  @HttpCode(200)
  @Post(':userId/role/edit')
  async roleEdit(
    @Param() param: EditRoleParam,
    @Body() body: EditRoleBody
  ): Promise<EditRoleRes> {
    const project = await this.prisma.project.findUniqueOrThrow({
      where: { friendlyId: param.projectFriendlyId }
    })
    const projUser = await this.prisma.projectUser.update({
      where: {
        projectId_userId: {
          userId: param.userId,
          projectId: project.id
        }
      },
      include: { user: true },
      data: { isAdmin: body.isAdmin }
    })

    return { user: mapToUserDto(projUser) }
  }

  @HttpCode(200)
  @Post('/:userId/remove')
  async remove(@Param() param: RemoveParam): Promise<RemoveRes> {
    const project = await this.prisma.project.findUniqueOrThrow({
      where: { friendlyId: param.projectFriendlyId }
    })
    await this.prisma.projectUser.delete({
      where: {
        projectId_userId: {
          userId: param.userId,
          projectId: project.id
        }
      }
    })

    return {}
  }
}
