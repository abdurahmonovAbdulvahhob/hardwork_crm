import { Module } from '@nestjs/common';
import { ReasonLidService } from './reason_lid.service';
import { ReasonLidController } from './reason_lid.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ReasonLidController],
  providers: [ReasonLidService],
  exports: [ReasonLidService],
})
export class ReasonLidModule {}
