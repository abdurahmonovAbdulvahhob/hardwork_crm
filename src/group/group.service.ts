import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GroupService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createGroupDto: CreateGroupDto) {
    const candidate = await this.prismaService.group.findUnique({
      where: {
        name: createGroupDto.name,
      },
    });

    if (candidate) {
      throw new BadRequestException('Group already exists');
    }

    const staff = await this.prismaService.staff.findUnique({
      where: { login: createGroupDto.staff },
    });

    if (!staff) {
      throw new NotFoundException('Staff does not exist');
    }

    const branch = await this.prismaService.branch.findUnique({
      where: { id: createGroupDto.branchId },
    });

    if (!branch) {
      throw new NotFoundException('Branch does not exist');
    }

    const newGroup = await this.prismaService.group.create({
      data: {
        name: createGroupDto.name,
        lesson_start_time: createGroupDto.lesson_start_time,
        lesson_continuous: createGroupDto.lesson_continuous,
        lesson_week_day: createGroupDto.lesson_week_day,
        group_stage_id: createGroupDto.group_stage_id,
        room_number: createGroupDto.room_number,
        room_floor: createGroupDto.room_floor,
        lessons_quant: createGroupDto.lessons_quant,
        is_active: createGroupDto.is_active,
        branchId: createGroupDto.branchId,
        staffs: {
          create: [{ staffId: staff.id }],
        },
      },
    });

    return newGroup;
  }

  findAll() {
    return this.prismaService.group.findMany({
      include: {
        staffs: { include: { staff: true } },
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} group`;
  }

  update(id: number, updateGroupDto: UpdateGroupDto) {
    return `This action updates a #${id} group`;
  }

  remove(id: number) {
    return `This action removes a #${id} group`;
  }
}
