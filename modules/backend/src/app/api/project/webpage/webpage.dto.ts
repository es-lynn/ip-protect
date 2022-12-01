import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

class Webpage {
  id: string
  name: string
  url: string
}

export class ListParam {
  @IsString()
  @IsNotEmpty()
  projectFriendlyId: string
}

export class ListRes {
  webpages: Webpage[]
}

export class AddParam {
  @IsString()
  @IsNotEmpty()
  projectFriendlyId: string
}

export class AddBody {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  url: string
}

export class AddRes {
  webpage: Webpage
}

export class EditParam {
  @IsString()
  @IsNotEmpty()
  projectFriendlyId: string

  @IsString()
  @IsNotEmpty()
  webpageId: string
}

export class EditBody {
  @IsString()
  @IsOptional()
  name?: string

  @IsString()
  @IsOptional()
  url?: string
}

export class EditRes {
  webpage: Webpage
}

export class DeleteParam {
  @IsString()
  @IsNotEmpty()
  projectFriendlyId: string

  @IsString()
  @IsNotEmpty()
  webpageId: string
}

export class DeleteRes {}
