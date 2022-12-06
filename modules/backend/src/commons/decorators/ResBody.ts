import { plainToInstance } from 'class-transformer'
import { validateSync } from 'class-validator'
import { ValidatorOptions } from 'class-validator/types/validation/ValidatorOptions'

import { Class } from '../types/Class'

/**
 * This decorator validates that the return value of a NestJS controller must conform to the specified DTO object.
 * It also automatically removes properties not whitelisted.
 */
export function ResBody(
  targetClass: Class<any>,
  opts: ValidatorOptions = {
    whitelist: true
  }
) {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value

    descriptor.value = async function (...args: any[]) {
      const result = await originalMethod.apply(this, args)

      const instance = plainToInstance(targetClass, result)
      const errors = validateSync(instance, opts)

      if (errors.length > 0) {
        throw new Error(`Invalid response body: ${errors.toString()}`)
      }

      return instance
    }
  }
}
