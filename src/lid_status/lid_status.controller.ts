import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LidStatusService } from './lid_status.service';
import { CreateLidStatusDto } from './dto/create-lid_status.dto';
import { UpdateLidStatusDto } from './dto/update-lid_status.dto';

@Controller('lid-status')
export class LidStatusController {
  constructor(private readonly lidStatusService: LidStatusService) {}

  @Post()
  async create(@Body() createLidStatusDto: CreateLidStatusDto) {
    return this.lidStatusService.create(createLidStatusDto);
  }

  @Get()
  async findAll() {
    return this.lidStatusService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.lidStatusService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateLidStatusDto: UpdateLidStatusDto
  ) {
    return this.lidStatusService.update(+id, updateLidStatusDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.lidStatusService.remove(+id);
  }
}
