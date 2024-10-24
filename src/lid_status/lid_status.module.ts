import { Module } from '@nestjs/common';
import { LidStatusService } from './lid_status.service';
import { LidStatusController } from './lid_status.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [LidStatusController],
  providers: [LidStatusService],
})
export class LidStatusModule {}
