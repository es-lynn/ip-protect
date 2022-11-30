import { plainToClass } from 'class-transformer'
import { validateSync } from 'class-validator'
import dotenv from 'dotenv'

import { Class } from '../types/Class'

dotenv.config()

export class Env<T extends Record<string, any>> {
  private env: T
  constructor(envSchema: Class<T>) {
    this.env = plainToClass(envSchema, process.env)

    const errors = validateSync(this.env, {
      whitelist: true
    })
    if (errors.length > 0) {
      throw Error(errors.toString())
    }
  }

  get<K extends keyof T>(key: K): T[K] | undefined {
    return this.env[key]
  }

  getOrThrow<K extends keyof T>(key: K): T[K] {
    const value = this.get(key)
    if (value == null) {
      throw Error(`Environment variable ${key.toString()} not found`)
    }
    return value
  }
}
