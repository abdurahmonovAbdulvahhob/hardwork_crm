import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateStaffDto } from './dto/create-stuff.dto';
import { UpdateStaffDto } from '../auth/dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class StaffService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createStaffDto: CreateStaffDto) {
    const candidate = await this.prismaService.staff.findUnique({
      where: {
        login: createStaffDto.login,
      },
    });

    if (candidate) {
      throw new BadRequestException('Email already exists');
    }

    const role = await this.prismaService.role.findUnique({
      where: { name: createStaffDto.role },
    });

    if (!role) {
      throw new NotFoundException('Role does not exist');
    }

    if (createStaffDto.password !== createStaffDto.confirm_password) {
      throw new BadRequestException('Password does not match');
    }
    const hashedPassword = await bcrypt.hash(createStaffDto.password, 10);

    const newStaff = await this.prismaService.staff.create({
      data: {
        first_name: createStaffDto.first_name,
        last_name: createStaffDto.last_name,
        phone_number: createStaffDto.phone_number,
        login: createStaffDto.login,
        hashedPassword,
        roles: {
          create: [{ roleId: role.id }],
        },
      },
    });

    return newStaff;
  }

  findAll() {
    return this.prismaService.staff.findMany({
      include: {
        roles: { include: { role: true } },
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} staff`;
  }

  update(id: number, updateStaffDto: UpdateStaffDto) {
    return `This action updates a #${id} staff`;
  }

  remove(id: number) {
    return `This action removes a #${id} staff`;
  }
}
