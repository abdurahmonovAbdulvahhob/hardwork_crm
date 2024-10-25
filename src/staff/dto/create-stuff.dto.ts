import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class CreateStaffDto {
  @IsOptional()
  @IsString()
  readonly first_name?: string;

  @IsOptional()
  @IsString()
  readonly last_name?: string;

  @IsEmail()
  readonly login: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  readonly confirm_password: string;

  @IsOptional()
  @IsString()
  @IsPhoneNumber('UZ')
  readonly phone_number?: string;

  @IsString()
  @IsNotEmpty()
  role: string;
}
