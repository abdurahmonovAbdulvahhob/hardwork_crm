import { Injectable } from '@nestjs/common';
import { CreateReasonLidDto } from './dto/create-reason_lid.dto';
import { UpdateReasonLidDto } from './dto/update-reason_lid.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReasonLidService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createReasonLidDto: CreateReasonLidDto) {
    const reasonLid = await this.prismaService.reasonLid.create({
      data: {
        reasonLid: createReasonLidDto.reasonLid,
      },
    });
    return reasonLid;
  }

  async findAll() {
    const reasonLids = await this.prismaService.reasonLid.findMany();
    return reasonLids;
  }

  async findOne(id: number) {
    const reasonLid = await this.prismaService.reasonLid.findUnique({
      where: { id },
    });
    if (!reasonLid) {
      throw new Error(`ReasonLid with id ${id} not found`);
    }
    return reasonLid;
  }

  async update(id: number, updateReasonLidDto: UpdateReasonLidDto) {
    const updatedReasonLid = await this.prismaService.reasonLid.update({
      where: { id },
      data: {
        reasonLid: updateReasonLidDto.reasonLid,
      },
    });
    return updatedReasonLid;
  }

  async remove(id: number) {
    const deletedReasonLid = await this.prismaService.reasonLid.delete({
      where: { id },
    });
    return deletedReasonLid;
  }
}
