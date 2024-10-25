import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../prisma/prisma.module';
import {
  AccessTokenStrategy,
  RefreshTokenCookieStrategy,
} from '../common/strategies';
import { StaffModule } from '../staff/staff.module';

@Module({
  imports: [JwtModule.register({}), PrismaModule,StaffModule],
  controllers: [AuthController],
  providers: [AuthService, AccessTokenStrategy, RefreshTokenCookieStrategy],
})
export class AuthModule {}
