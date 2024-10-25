import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post('create')
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupService.create(createGroupDto);
  }

  @Get('get')
  findAll() {
    return this.groupService.findAll();
  }

  @Get('get/:id')
  findOne(@Param('id') id: string) {
    return this.groupService.findOne(+id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupService.update(+id, updateGroupDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.groupService.remove(+id);
  }
}
