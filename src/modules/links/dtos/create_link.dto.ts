import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class CreateLinkDto {


    @IsString()
    @IsNotEmpty()
    link!: string;

    @IsString()
    alias!: string;

    @IsNumber()
    @Min(1)
    expireTime!: number;



}