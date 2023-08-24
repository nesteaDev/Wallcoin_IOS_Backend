import { Type } from 'class-transformer';
import { IsOptional, IsPositive, IsUUID, Min } from 'class-validator';

export default class PaginationTransactionDto {
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  limit?: number;
  @IsOptional()
  @Type(() => Number)
  @Min(0)
  offSet?: number;
  @IsUUID()
  idUser?: string;
}
