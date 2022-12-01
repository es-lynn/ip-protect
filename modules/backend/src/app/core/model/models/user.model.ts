import { PrismaClient } from '@prisma/client'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function User({ user }: PrismaClient) {
  return Object.assign(user, {})
}
