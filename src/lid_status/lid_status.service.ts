import { Injectable } from '@nestjs/common';
import { CreateLidStatusDto, UpdateLidStatusDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LidStatusService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createLidStatusDto: CreateLidStatusDto) {
    const lidStatus = await this.prismaService.lidStatus.create({
      data: {
        status: createLidStatusDto.status,
      },
    });
    return lidStatus;
  }

  async findAll() {
    return this.prismaService.lidStatus.findMany(); // Fetch all lid statuses
  }

  async findOne(id: number) {
    const lidStatus = await this.prismaService.lidStatus.findUnique({
      where: { id },
    });
    if (!lidStatus) {
      throw new Error(`LidStatus with id ${id} not found`);
    }
    return lidStatus;
  }

  async update(id: number, updateLidStatusDto: UpdateLidStatusDto) {
    const lidStatus = await this.prismaService.lidStatus.update({
      where: { id },
      data: {
        status: updateLidStatusDto.status,
      },
    });
    return lidStatus;
  }

  async remove(id: number) {
    const lidStatus = await this.prismaService.lidStatus.delete({
      where: { id },
    });
    return lidStatus;
  }
}
