import { PartialType } from '@nestjs/swagger';
import { CreateStaffDto } from './create-stuff.dto';

export class UpdateStaffDto extends PartialType(CreateStaffDto) {}
