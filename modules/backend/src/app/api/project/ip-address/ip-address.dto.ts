import { IsNotEmpty, IsString } from 'class-validator'

import { IpAddress } from '../_dto/dto'

export class ListParam {
  @IsString()
  @IsNotEmpty()
  projectFriendlyId: string
}

export class ListRes {
  ipAddresses: IpAddress[]
}

export class addParam {
  @IsString()
  @IsNotEmpty()
  projectFriendlyId: string
}

export class AddBody {
  @IsString()
  @IsNotEmpty()
  ip: string

  @IsString()
  @IsNotEmpty()
  tag: string
}

export class AddRes {
  ipAddress: IpAddress
}

export class EditParam {
  @IsString()
  @IsNotEmpty()
  projectFriendlyId: string

  @IsString()
  @IsNotEmpty()
  ipAddressId: string
}

export class EditBody {
  @IsString()
  @IsNotEmpty()
  ip: string

  @IsString()
  @IsNotEmpty()
  tag: string
}

export class EditRes {
  ipAddress: IpAddress
}

export class RemoveParam {
  @IsString()
  @IsNotEmpty()
  projectFriendlyId: string

  @IsString()
  @IsNotEmpty()
  ipAddressId: string
}

export class RemoveRes {}
