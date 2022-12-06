import { IsNotEmpty, IsString } from 'class-validator'

export class AuthLoginBody {
  @IsString()
  @IsNotEmpty()
  code: string
}

export class AuthLoginRes {
  accessToken: string
}
