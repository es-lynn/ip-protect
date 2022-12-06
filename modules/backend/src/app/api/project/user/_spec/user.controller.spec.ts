import { PrismaService } from '../../../../core/prisma/prisma.service'
import { UserController } from '../user.controller'

describe('UserController', () => {
  const prisma = new PrismaService()
  const userController = new UserController(prisma)
  describe('/list', () => {
    beforeAll(async () => {
      const user = await prisma.user.create({
        data: {
          id: 'f2fca902eb59',
          name: 'Evelyn Toh',
          provider: 'gcc',
          providerId: 'evelyn_toh@outlook.com'
        }
      })
      const user2 = await prisma.user.create({
        data: {
          id: 'b3c9affca0be',
          name: 'Toh Yan Li',
          provider: 'gcc',
          providerId: 'toh_yan_li@outlook.com'
        }
      })
      await prisma.project.create({
        data: {
          friendlyId: 'doppel-scanner',
          projectUsers: {
            create: [
              { userId: user.id, isAdmin: true },
              { userId: user2.id, isAdmin: false }
            ]
          }
        }
      })
      await prisma.project.create({
        data: {
          friendlyId: 'squarebox'
        }
      })
    })

    it('should return a list of users', async () => {
      const { users } = await userController.list({
        projectFriendlyId: 'doppel-scanner'
      })
      expect(users.length).toEqual(2)
      expect(users.find(it => it.id === 'f2fca902eb59')).toEqual({
        id: 'f2fca902eb59',
        name: 'Evelyn Toh',
        provider: 'gcc',
        providerId: 'evelyn_toh@outlook.com',
        isAdmin: true
      })
      expect(users.find(it => it.id === 'b3c9affca0be')).toEqual({
        id: 'b3c9affca0be',
        name: 'Toh Yan Li',
        provider: 'gcc',
        providerId: 'toh_yan_li@outlook.com',
        isAdmin: false
      })
    })

    it('should return an empty list of users', async () => {
      const { users } = await userController.list({
        projectFriendlyId: 'squarebox'
      })
      expect(users).toEqual([])
    })
  })
})
