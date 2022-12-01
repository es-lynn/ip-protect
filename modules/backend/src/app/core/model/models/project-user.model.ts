import { PrismaClient } from '@prisma/client'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function ProjectUser({ projectUser }: PrismaClient) {
  return Object.assign(projectUser, {})
}
