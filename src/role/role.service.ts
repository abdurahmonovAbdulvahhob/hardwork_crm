import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RoleService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createRoleDto: CreateRoleDto) {
    const role = await this.prismaService.role.create({
      data: {
        name: createRoleDto.name,
      },
    });
    return role;
  }

  async findAll() {
    const roles = await this.prismaService.role.findMany({include: {staffs: {include: {staff: true}}}});
    return roles;
  }

  async findOne(id: number) {
    const role = await this.prismaService.role.findUnique({
      where: { id },
    });
    if (!role) {
      throw new Error(`Role with id ${id} not found`);
    }
    return role;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const updatedRole = await this.prismaService.role.update({
      where: { id },
      data: {
        name: updateRoleDto.name,
      },
    });
    return updatedRole;
  }

  async remove(id: number) {
    const deletedRole = await this.prismaService.role.delete({
      where: { id },
    });
    return deletedRole;
  }
}
