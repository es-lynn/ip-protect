import { PrismaClient } from '@prisma/client'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function Project({ project }: PrismaClient) {
  return Object.assign(project, {
    async findId(friendlyId: string): Promise<string> {
      return (
        await project.findUniqueOrThrow({
          where: {
            friendlyId: friendlyId
          }
        })
      ).id
    }
  })
}
