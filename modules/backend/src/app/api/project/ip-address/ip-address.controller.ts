import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotImplementedException,
  Param,
  Post,
  Query,
  Req
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Request } from 'express'

import { ModelService } from '../../../core/model/model.service'
import { PrismaService } from '../../../core/prisma/prisma.service'
import { IpAddressRes } from '../../misc/misc.dto'
import {
  AddBody,
  addParam,
  AddRes,
  EditBody,
  EditParam,
  EditRes,
  ListParam,
  ListRes,
  RemoveParam,
  RemoveRes
} from './ip-address.dto'

@ApiTags('/project/:projectFriendlyId/user/@me/ip-address')
@Controller('/project/:projectFriendlyId/user/@me/ip-address')
export class IpAddressController {
  constructor(private db: ModelService) {}

  @HttpCode(200)
  @Get('/list')
  async list(@Param() param: ListParam): Promise<ListRes> {
    const me = 'b6862bc4-e1c6-42e5-86af-5044c9799157'
    const projectUser = await this.db.projectUser.findUniqueOrThrow({
      where: {
        projectId_userId: {
          userId: me,
          projectId: await this.db.project.findId(param.projectFriendlyId)
        }
      },
      include: { ipAddresses: true }
    })
    return {
      ipAddresses: projectUser.ipAddresses.map(it => ({
        id: it.id,
        ip: it.ipAddress,
        tag: it.tag
      }))
    }
  }

  @HttpCode(201)
  @Post('/add')
  async add(@Param() param: addParam, @Body() body: AddBody): Promise<AddRes> {
    const me = 'b6862bc4-e1c6-42e5-86af-5044c9799157'
    const projectId = await this.db.project.findId(param.projectFriendlyId)
    const projectUser = await this.db.projectUser.findUniqueOrThrow({
      where: {
        projectId_userId: {
          userId: me,
          projectId: projectId
        }
      }
    })
    const ipAddress = await this.db.ipAddress.create({
      data: {
        ipAddress: body.ip,
        tag: body.tag,
        projectId: projectId,
        projectUserId: projectUser.id
      }
    })
    return {
      ipAddress: {
        ip: ipAddress.ipAddress,
        tag: ipAddress.tag,
        id: ipAddress.id
      }
    }
  }

  @HttpCode(200)
  @Post('/:ipAddressId/edit')
  async edit(
    @Param() param: EditParam,
    @Body() body: EditBody
  ): Promise<EditRes> {
    const ipAddress = await this.db.ipAddress.update({
      where: { id: param.ipAddressId },
      data: {
        ipAddress: body.ip,
        tag: body.tag
      }
    })
    return {
      ipAddress: {
        ip: ipAddress.ipAddress,
        tag: ipAddress.tag,
        id: ipAddress.id
      }
    }
  }

  @HttpCode(200)
  @Post('/:ipAddressId/remove')
  async remove(@Param() param: RemoveParam): Promise<RemoveRes> {
    await this.db.ipAddress.delete({
      where: { id: param.ipAddressId }
    })
    return {}
  }
}
