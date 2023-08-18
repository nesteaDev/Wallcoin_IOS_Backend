export default interface AddUserAccountRequestDto {
  idUser?: string;
  username?: string;
  accountNumber: string;
  accountType: string;
}

// Se puede crear un usecase que me valide el tipo de cuenta y asi asignatrlo a la cuenta
