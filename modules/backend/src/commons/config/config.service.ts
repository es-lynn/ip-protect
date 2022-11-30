import { Injectable } from '@nestjs/common'

@Injectable()
// @ts-ignore
export class Config<T extends Record<string, any>> implements T {}
