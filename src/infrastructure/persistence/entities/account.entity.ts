import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import User from './user.entity';

@Entity()
export default class Account {
  @PrimaryGeneratedColumn('uuid', {
    name: 'idAccount',
  })
  idAccount: string;

  @Column('uuid', { name: 'idUser' })
  idUser: string;

  @Column('varchar', { length: 255, name: 'accountNumber' })
  accountNumber: string;

  @Column('float', { name: 'balance' })
  balance: number;

  @Column('varchar', { length: 255, name: 'accountType' })
  accountType: string;

  @Column('date', { name: 'createdAtDate' })
  createdAt: Date;

  @Column('date', { name: 'updatedAtDate' })
  updatedAt: Date;

  @OneToOne(() => User, (user) => user.account)
  @JoinColumn({ name: 'idUser', referencedColumnName: 'idUser' })
  user: User;
}
