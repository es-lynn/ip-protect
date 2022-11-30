import { Transform, Type } from 'class-transformer'
import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator'

export class EnvSchema {
  @Type(() => Number)
  @IsNotEmpty()
  @IsNumber()
  APP_PORT: number

  @Transform(({ value }) => value === 'true')
  @IsNotEmpty()
  @IsBoolean()
  APP_DEV_MODE: boolean
}
