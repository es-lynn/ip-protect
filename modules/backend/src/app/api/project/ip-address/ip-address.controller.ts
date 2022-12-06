import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  UseGuards
} from '@nestjs/common'
import {
  ApiBasicAuth,
  ApiBearerAuth,
  ApiHeader,
  ApiTags
} from '@nestjs/swagger'
import { User } from '@prisma/client'

import { ConfigService } from '../../../core/config/config.service'
import { AuthGuard } from '../../../core/guards/auth-guard'
import { AuthUser } from '../../../core/guards/decorators/AuthUser'
import { UseAuthGuard } from '../../../core/guards/decorators/UseAuthGuard'
import { ModelService } from '../../../core/model/model.service'
import { ProjectType } from '../../../core/model/models/project.type'
import { AwsIpSet } from '../../../core/services/aws/aws-ipset/aws-ipset'
import {
  IpAddressAddBody,
  IpAddressAddParam,
  IpAddressAddRes,
  IpAddressListParam,
  IpAddressListRes,
  IpAddressRemoveBody,
  IpAddressRemoveParam,
  IpAddressRemoveRes
} from './ip-address.dto'

@UseAuthGuard()
@ApiTags('/project/:projectFriendlyId/user/@me/ip-address')
@Controller('/project/:projectFriendlyId/user/@me/ip-address')
export class IpAddressController {
  constructor(private db: ModelService, private cfg: ConfigService) {}

  @HttpCode(200)
  @Get('/list')
  async list(
    @Param() param: IpAddressListParam,
    @AuthUser() user: User
  ): Promise<IpAddressListRes> {
    const project = (await this.db.project.findUniqueOrThrow({
      where: { friendlyId: param.projectFriendlyId }
    })) as ProjectType
    const projectUser = await this.db.projectUser.findUniqueOrThrow({
      where: {
        projectId_userId: {
          userId: user.id,
          projectId: await this.db.project.findId(param.projectFriendlyId)
        }
      },
      include: { ipAddresses: true }
    })

    const awsIpSet = new AwsIpSet({
      accessKeyId: this.cfg.aws.access_key_id,
      secretAccessKey: this.cfg.aws.secret_access_key,
      id: project.config.ipset.id,
      name: project.config.ipset.name,
      region: project.config.ipset.region
    })
    const ipAddresses = await awsIpSet.getIpAddressesForIpset()

    return {
      ipAddresses: projectUser.ipAddresses.map(it => ({
        id: it.id,
        ip: it.ipAddress,
        tag: it.tag,
        synced: ipAddresses.IPSet.Addresses.some(
          ip => ip.split('/')[0] === it.ipAddress
        )
      }))
    }
  }

  @HttpCode(201)
  @Post('/add')
  async add(
    @Param() param: IpAddressAddParam,
    @Body() body: IpAddressAddBody,
    @AuthUser() user: User
  ): Promise<IpAddressAddRes> {
    const project = (await this.db.project.findUniqueOrThrow({
      where: { friendlyId: param.projectFriendlyId }
    })) as ProjectType
    const projectUser = await this.db.projectUser.findUniqueOrThrow({
      where: {
        projectId_userId: {
          userId: user.id,
          projectId: project.id
        }
      }
    })

    const awsIpSet = new AwsIpSet({
      accessKeyId: this.cfg.aws.access_key_id,
      secretAccessKey: this.cfg.aws.secret_access_key,
      id: project.config.ipset.id,
      name: project.config.ipset.name,
      region: project.config.ipset.region
    })
    await awsIpSet.addIpAddressesToIpset(body.ip)
    const ipAddress = await this.db.ipAddress.create({
      data: {
        ipAddress: body.ip,
        tag: body.tag,
        projectId: project.id,
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

  // @HttpCode(200)
  // @Post('/:ipAddressId/edit')
  // async edit(
  //   @Param() param: EditParam,
  //   @Body() body: EditBody
  // ): Promise<EditRes> {
  //   const ipAddress = await this.db.ipAddress.update({
  //     where: { id: param.ipAddressId },
  //     data: {
  //       ipAddress: body.ip,
  //       tag: body.tag
  //     }
  //   })
  //   return {
  //     ipAddress: {
  //       ip: ipAddress.ipAddress,
  //       tag: ipAddress.tag,
  //       id: ipAddress.id
  //     }
  //   }
  // }

  @HttpCode(200)
  @Post('/remove')
  async remove(
    @Param() param: IpAddressRemoveParam,
    @Body() body: IpAddressRemoveBody
  ): Promise<IpAddressRemoveRes> {
    const project = (await this.db.project.findUniqueOrThrow({
      where: { friendlyId: param.projectFriendlyId }
    })) as ProjectType
    const awsIpSet = new AwsIpSet({
      accessKeyId: this.cfg.aws.access_key_id,
      secretAccessKey: this.cfg.aws.secret_access_key,
      id: project.config.ipset.id,
      name: project.config.ipset.name,
      region: project.config.ipset.region
    })
    await awsIpSet.removeIpAddressesFromIpset(body.ipAddress)
    await this.db.ipAddress.deleteMany({
      where: {
        projectId: project.id,
        ipAddress: body.ipAddress
      }
    })
    return {}
  }

  // @HttpCode(200)
  // @Post(':ipAddressId/sync')
  // async sync(@Param() param: IpAddressSyncParam): Promise<IpAddressSyncRes> {
  //   const project = (await this.db.project.findUniqueOrThrow({
  //     where: { friendlyId: param.projectFriendlyId }
  //   })) as ProjectType
  //   const ipAddresses = await this.db.ipAddress.findUniqueOrThrow({
  //     where: { id: param.ipAddressId }
  //   })
  //
  //   const awsIpSet = new AwsIpSet({
  //     accessKeyId: this.cfg.aws.access_key_id,
  //     secretAccessKey: this.cfg.aws.secret_access_key,
  //     id: project.config.ipset.id,
  //     name: project.config.ipset.name,
  //     region: project.config.ipset.region
  //   })
  //   await awsIpSet.addIpAddressesToIpset(ipAddresses.ipAddress)
  //
  //   return {}
  // }
}
