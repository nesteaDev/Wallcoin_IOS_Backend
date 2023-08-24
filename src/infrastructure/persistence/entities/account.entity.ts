import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
// import User from './user.entity';
import UserEntity from './user.entity';

@Entity({
  name: 'account',
})
export default class AccountEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'idAccount',
  })
  idAccount: string;

  @Column('uuid', { name: 'idUser' })
  idUser: string;

  @Column('varchar', {
    length: 255,
    name: 'accountNumber',
    nullable: true,
    unique: true,
  })
  accountNumber: string;

  @Column('float', { name: 'balance', nullable: true, default: 0 })
  balance: number;

  @Column('varchar', { length: 255, name: 'accountType', nullable: true })
  accountType: string;

  @Column('date', { name: 'createdAtDate', nullable: true })
  createdAt: Date;

  @Column('date', { name: 'updatedAtDate', nullable: true })
  updatedAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.accounts)
  @JoinColumn({ name: 'idUser', referencedColumnName: 'idUser' })
  user: UserEntity;

  //Posible implementación de relación con transacción
  // @OneToMany(
  //   () => TransactionEntity,
  //   (transactionEntity) => transactionEntity.account,
  //   { cascade: true },
  // )
  // transactions?: TransactionEntity[];
}
