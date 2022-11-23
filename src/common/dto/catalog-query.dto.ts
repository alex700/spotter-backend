import { IsOptional, IsPositive } from 'class-validator';

export class CatalogQueryDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @IsPositive()
  offset: number;

  @IsOptional()
  filters: string;
}
