import { PrismaClient } from '@prisma/client'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function IpAddress({ ipAddress }: PrismaClient) {
  return Object.assign(ipAddress, {})
}
