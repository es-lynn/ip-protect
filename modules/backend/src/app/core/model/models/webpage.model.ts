import { PrismaClient } from '@prisma/client'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function Webpage({ webpage }: PrismaClient) {
  return Object.assign(webpage, {})
}
