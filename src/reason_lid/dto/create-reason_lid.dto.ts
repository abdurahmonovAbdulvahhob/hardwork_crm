import { IsString } from "class-validator";

export class CreateReasonLidDto {
    @IsString()
    reasonLid: string;
}
