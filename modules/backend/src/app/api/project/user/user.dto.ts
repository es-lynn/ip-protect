import { IsBoolean, IsNotEmpty, IsString } from 'class-validator'

import { User } from '../_dto/dto'

export class ListParam {
  @IsString()
  @IsNotEmpty()
  projectFriendlyId: string
}

export class ListRes {
  users: User[]
}

export class AddParam {
  @IsString()
  @IsNotEmpty()
  projectFriendlyId: string
}

export class AddBody {
  @IsString()
  @IsNotEmpty()
  id: string

  @IsBoolean()
  @IsNotEmpty()
  isAdmin: boolean
}

export class AddRes {
  user: User
}

export class EditRoleParam {
  @IsString()
  @IsNotEmpty()
  projectFriendlyId: string

  @IsString()
  @IsNotEmpty()
  userId: string
}

export class EditRoleBody {
  @IsBoolean()
  @IsNotEmpty()
  isAdmin: boolean
}

export class EditRoleRes {
  user: User
}

export class RemoveParam {
  @IsString()
  @IsNotEmpty()
  projectFriendlyId: string

  @IsString()
  @IsNotEmpty()
  userId: string
}

export class RemoveRes {}
