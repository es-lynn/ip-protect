import { HttpException, HttpStatus } from '@nestjs/common'
import { ValidationError } from '@nestjs/common/interfaces/external/validation-error.interface'

export class ClassValidationError extends HttpException {
  constructor(errors: ValidationError[]) {
    const errorList: string[] = []
    errors.forEach(err => {
      // @ts-ignore
      Object.values(err.constraints).forEach(constraint =>
        errorList.push(constraint)
      )
    })
    super(errorList.toString(), HttpStatus.BAD_REQUEST)
    Object.setPrototypeOf(this, ClassValidationError.prototype)
  }
}
