import {IsNumber, IsString} from "class-validator";

export class CreateProductDto {
    @IsString()
    readonly title: string;

    @IsNumber()
    readonly price;

    @IsNumber()
    readonly stricken_price;

    @IsString()
    readonly image: string;

    @IsString()
    readonly vendor: string;
}