import { PartialType } from '@nestjs/swagger';
import { CreateAuthStaffDto } from './create-staff.dto';

export class UpdateStaffDto extends PartialType(CreateAuthStaffDto) {}
