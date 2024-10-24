import { IsString } from "class-validator";

export class CreateLidStatusDto {
    @IsString()
    status: string;
}
