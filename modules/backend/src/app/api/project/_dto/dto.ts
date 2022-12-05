import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class IpAddress {
  @ApiProperty()
  id: string

  @ApiProperty()
  ip: string

  @ApiProperty()
  tag: string
}

export class User {
  id: string
  name: string
  provider: string
  providerId: string
  isAdmin: boolean
}
