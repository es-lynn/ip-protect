import { ApiProperty } from '@nestjs/swagger'

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
