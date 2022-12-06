import { DynamicModule, Module } from '@nestjs/common'

import { PrismaModule } from '../prisma/prisma.module'
import { AuthGuard } from './auth-guard'

@Module({
  imports: [PrismaModule],
  providers: [AuthGuard],
  exports: [AuthGuard]
})
export class AuthGuardModule {
  static register(opts: { isGlobal?: boolean }): DynamicModule {
    return {
      module: AuthGuardModule,
      imports: [PrismaModule],
      providers: [AuthGuard],
      exports: [AuthGuard],
      global: opts.isGlobal ?? false
    }
  }
}
