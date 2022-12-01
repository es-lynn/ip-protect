import { Injectable } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

import { IpAddress } from './models/ip-address.model'
import { Project } from './models/project.model'
import { ProjectUser } from './models/project-user.model'
import { User } from './models/user.model'
import { Webpage } from './models/webpage.model'

@Injectable()
export class ModelService {
  project
  projectUser
  user
  webpage
  ipAddress

  constructor(prisma: PrismaClient) {
    this.project = Project(prisma)
    this.projectUser = ProjectUser(prisma)
    this.user = User(prisma)
    this.webpage = Webpage(prisma)
    this.ipAddress = IpAddress(prisma)
  }
}
