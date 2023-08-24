import {
  IsDate,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import AccountType from './AccountType';

export default class CreateAccountRequestDto {
  @IsUUID()
  @IsOptional()
  idUser?: string;
  @IsString()
  @IsNotEmpty()
  accountNumber: string;
  @IsString()
  @IsNotEmpty()
  @IsIn([AccountType.PERSONAL, AccountType.BUSINESS])
  accountType: string;
  @IsDate()
  @IsOptional()
  createdAt?: Date;
  // @IsArray()
  // @IsOptional()
  // transactions?: Transaction[];
}
