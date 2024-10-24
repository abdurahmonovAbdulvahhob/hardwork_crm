import { Module } from '@nestjs/common';
import { StuffService } from './stuff.service';
import { StuffController } from './stuff.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [StuffController],
  providers: [StuffService],
})
export class StuffModule {}
