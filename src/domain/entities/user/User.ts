import Account from '../account/Account';

export default class User {
  idUser: string;
  name: string;
  email: string;
  account?: Account;
  urlImage: string;
}
