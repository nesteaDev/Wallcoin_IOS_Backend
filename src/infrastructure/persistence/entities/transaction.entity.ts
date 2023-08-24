import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'transaction',
})
export default class TransactionEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'idTransaction',
  })
  idTransaction: string;

  @Column('uuid', { name: 'idUser', unique: false })
  idUser: string;

  @Column('uuid', { name: 'idDestinationUser', unique: false })
  idDestinationUser: string;

  @Column('float', { name: 'amount' })
  amount: number;

  @Column('date', { name: 'createdAt', nullable: true })
  createdAt: Date;

  @Column('varchar', { name: 'transactionType', unique: false, length: 255 })
  transactionType: string;

  //Posible implementación de relación con cuenta
  // @ManyToOne(() => AccountEntity, (account) => account.transactions)
  // @JoinColumn({ name: 'idAccount_account', referencedColumnName: 'idAccount' })
  // account: AccountEntity;
}
