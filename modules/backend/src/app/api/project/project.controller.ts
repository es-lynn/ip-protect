import { Body, Controller, Get, HttpCode, Param, Patch, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { User } from '@prisma/client'

import { AuthUser } from '../../core/guards/decorators/AuthUser'
import { UseAuthGuard } from '../../core/guards/decorators/UseAuthGuard'
import { ProjectType } from '../../core/model/models/project.type'
import { PrismaService } from '../../core/prisma/prisma.service'
import {
  ProjectCreateBody,
  ProjectCreateRes,
  ProjectDeleteParam,
  ProjectDeleteRes,
  ProjectEditBody,
  ProjectEditParam,
  ProjectEditRes,
  ProjectViewParam,
  ProjectViewRes
} from './project.dto'
import { mapProjectToRes } from './project.util'

@UseAuthGuard()
@ApiTags('/project')
@Controller('/project')
export class ProjectController {
  constructor(private prisma: PrismaService) {}

  @HttpCode(200)
  @Post('/create')
  async create(@AuthUser() user: User, @Body() body: ProjectCreateBody): Promise<ProjectCreateRes> {
    const project = (await this.prisma.project.create({
      data: {
        friendlyId: body.friendlyId,
        awsAccessKey: body.awsAccessKey,
        awsSecret: body.awsSecret,
        config: {
          ipset: {
            id: body.ipset.id,
            name: body.ipset.name,
            region: body.ipset.region
          }
        }
      }
    })) as ProjectType
    await this.prisma.projectUser.create({
      data: {
        projectId: project.id,
        userId: user.id,
        isAdmin: true
      }
    })

    return {
      project: mapProjectToRes(project)
    }
  }

  @HttpCode(200)
  @Patch('/:projectFriendlyId/edit')
  async edit(
    @Param() param: ProjectEditParam,
    @Body() body: ProjectEditBody
  ): Promise<ProjectEditRes> {
    const project = (await this.prisma.project.update({
      where: { friendlyId: param.projectFriendlyId },
      data: {
        friendlyId: body.friendlyId,
        awsAccessKey: body.awsAccessKey,
        awsSecret: body.awsSecret,
        config: body.ipset
          ? {
              ipset: {
                id: body.ipset.id,
                name: body.ipset.name,
                region: body.ipset.region
              }
            }
          : undefined
      }
    })) as ProjectType

    return {
      project: mapProjectToRes(project)
    }
  }

  @HttpCode(200)
  @Get('/:projectFriendlyId')
  async view(@Param() param: ProjectViewParam): Promise<ProjectViewRes> {
    const project = (await this.prisma.project.findUniqueOrThrow({
      where: { friendlyId: param.projectFriendlyId }
    })) as ProjectType

    return {
      project: mapProjectToRes(project)
    }
  }

  @HttpCode(200)
  @Post('/:projectFriendlyId/delete')
  async delete(@Param() param: ProjectDeleteParam): Promise<ProjectDeleteRes> {
    await this.prisma.project.delete({
      where: { friendlyId: param.projectFriendlyId },
      include: {
        projectUsers: true,
        ipAddresses: true,
        webpages: true
      }
    })
    return {}
  }
}
