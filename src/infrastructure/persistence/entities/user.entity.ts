import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Account from './account.entity';

@Entity({
  name: 'user',
})
export default class UserEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'idUser',
  })
  idUser: string;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 50,
  })
  name: string;

  @Column({
    name: 'email',
    type: 'varchar',
    length: 100,
  })
  email: string;

  @Column('uuid', { name: 'idAccount' })
  idAccount: string;

  @Column({
    name: 'urlImage',
    type: 'varchar',
    length: 255,
  })
  url: string;

  @OneToOne(() => Account, (account) => account.user)
  @JoinColumn({ name: 'idAccount', referencedColumnName: 'idAccount' })
  account: Account;
}
