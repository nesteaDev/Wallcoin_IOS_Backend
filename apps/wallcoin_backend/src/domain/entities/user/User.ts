import Account from '../account/Account';
import Transaction from '../transaction/transaction';

export default class User {
  idUser: string;
  name: string;
  email: string;
  accounts?: Account[];
  transactions?: Transaction[];
  urlImage: string;
}
