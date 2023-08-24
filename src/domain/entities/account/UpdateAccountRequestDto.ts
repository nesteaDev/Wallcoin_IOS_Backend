import {
  IsString,
  IsNotEmpty,
  IsDate,
  IsOptional,
  IsIn,
} from 'class-validator';
import AccountType from './AccountType';

export default class UpdateAccountRequestDto {
  @IsString()
  @IsNotEmpty()
  accountNumber: string;
  @IsString()
  @IsNotEmpty()
  @IsIn([AccountType.PERSONAL, AccountType.BUSINESS])
  accountType: AccountType;
  @IsDate()
  @IsOptional()
  createdAt?: Date;
  @IsDate()
  @IsOptional()
  updateAt?: Date;
}
