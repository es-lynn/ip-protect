import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

export class MeIpAddressRes {
  @IsString()
  ipv4: string

  @IsString()
  @IsOptional()
  ipv6?: string
}

class Project {
  id: string
  friendlyId: string
}
export class MeProjectListRes {
  @ApiProperty({ type: Project, isArray: true })
  projects: Project[]
}

export class ProjectDetailsParams {
  @IsString()
  friendlyId: string
}

class IpAddress {
  id: string
  ipAddress: string
  tag: string
}

class Webpage {
  id: string
  name: string
  url: string
}
export type ProjectDetailsRes = {
  project: {
    id: string
    friendlyId: string
    me: {
      isAdmin: boolean
      ipAddresses: IpAddress[]
    }
    webpages: Webpage[]
    users: {
      id: string
      providerId: string
      provider: string
      isAdmin: boolean
      ipAddresses?: IpAddress[]
    }[]
  }
}
