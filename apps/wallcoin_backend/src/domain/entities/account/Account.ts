import AccountType from './AccountType';

export default class Account {
  idAccount?: string;
  accountNumber?: string;
  balance?: number;
  idUser?: string;
  accountType?: AccountType;
  createdAt?: Date;
  updatedAt?: Date;
  // transactions?: Transaction[];
}
