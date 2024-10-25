import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class CreateGroupDto {
  @IsOptional()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly lesson_start_time?: string;

  @IsOptional()
  @IsString()
  readonly lesson_continuous?: string;

  @IsOptional()
  @IsArray()
  readonly lesson_week_day?: string[];

  @IsOptional()
  @IsNumber()
  readonly group_stage_id?: number;

  @IsOptional()
  @IsString()
  readonly room_number?: string;

  @IsOptional()
  @IsNumber()
  readonly room_floor?: number;

  @IsOptional()
  @IsNumber()
  readonly branchId?: number;

  @IsOptional()
  @IsNumber()
  readonly lessons_quant?: number;

  @IsOptional()
  @IsBoolean()
  readonly is_active?: boolean;

  @IsString()
  @IsNotEmpty()
  staff: string;
}
