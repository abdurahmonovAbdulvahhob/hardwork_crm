import { Injectable } from '@nestjs/common';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BranchService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createBranchDto: CreateBranchDto) {
    const branch = await this.prismaService.branch.create({
      data: {
        name: createBranchDto.name,
        address: createBranchDto.address,
        callNumber: createBranchDto.callNumber,
      },
    });
    return branch;
  }

  async findAll() {
    const branches = await this.prismaService.branch.findMany();
    return branches;
  }

  async findOne(id: number) {
    const branch = await this.prismaService.branch.findUnique({
      where: { id },
    });
    if (!branch) {
      throw new Error(`Branch with id ${id} not found`);
    }
    return branch;
  }

  async update(id: number, updateBranchDto: UpdateBranchDto) {
    const updatedBranch = await this.prismaService.branch.update({
      where: { id },
      data: {
        name: updateBranchDto.name,
        address: updateBranchDto.address,
        callNumber: updateBranchDto.callNumber,
      },
    });
    return updatedBranch;
  }

  async remove(id: number) {
    const deletedBranch = await this.prismaService.branch.delete({
      where: { id },
    });
    return deletedBranch;
  }
}
