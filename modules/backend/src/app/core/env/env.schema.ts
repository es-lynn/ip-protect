import { Transform, Type } from 'class-transformer'
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class EnvSchema {
  /**
   * APP
   */
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

  /**
   * AWS
   */
  @Type(() => String)
  @IsNotEmpty()
  @IsString()
  AWS_ACCESS_KEY_ID: string

  @Type(() => String)
  @IsNotEmpty()
  @IsString()
  AWS_SECRET_ACCESS_KEY: string

  /**
   * AUTH
   */
  @Type(() => String)
  @IsNotEmpty()
  @IsString()
  AUTH_CERT_URL: string

  @Type(() => String)
  @IsNotEmpty()
  @IsString()
  AUTH_REDIRECT_URL: string

  @Type(() => String)
  @IsNotEmpty()
  @IsString()
  AUTH_TOKEN_URL: string

  @Type(() => String)
  @IsNotEmpty()
  @IsString()
  AUTH_CLIENT_ID: string

  @Type(() => String)
  @IsNotEmpty()
  @IsString()
  AUTH_CLIENT_SECRET: string

  @Type(() => String)
  @IsNotEmpty()
  @IsString()
  AUTH_BASIC_PASSWORD: string
}
