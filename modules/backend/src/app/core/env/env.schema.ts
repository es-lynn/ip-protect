import { Transform, Type } from 'class-transformer'
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class EnvSchema {
  @Type(() => Number)
  @IsNotEmpty()
  @IsNumber()
  APP_PORT: number

  @Transform(({ value }) => value === 'true')
  @IsNotEmpty()
  @IsBoolean()
  APP_DEV_MODE: boolean

  @Transform(({ value }) => value === 'true')
  @IsNotEmpty()
  @IsBoolean()
  APP_ENABLE_SWAGGER: boolean

  @Type(() => String)
  @IsNotEmpty()
  @IsString()
  AWS_ACCESS_KEY_ID: string

  @Type(() => String)
  @IsNotEmpty()
  @IsString()
  AWS_SECRET_ACCESS_KEY: string
}
