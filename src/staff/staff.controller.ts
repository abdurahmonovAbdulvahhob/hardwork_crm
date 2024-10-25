import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StaffService } from './staff.service';
import { CreateStaffDto } from './dto/create-stuff.dto';
import { UpdateStaffDto } from './dto/update-stuff.dto';

@Controller('staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @Post('create')
  create(@Body() createStaffDto: CreateStaffDto) {
    return this.staffService.create(createStaffDto);
  }

  @Get('get')
  findAll() {
    return this.staffService.findAll();
  }

  @Get('get:id')
  findOne(@Param('id') id: string) {
    return this.staffService.findOne(+id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateStaffDto: UpdateStaffDto) {
    return this.staffService.update(+id, updateStaffDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.staffService.remove(+id);
  }
}
