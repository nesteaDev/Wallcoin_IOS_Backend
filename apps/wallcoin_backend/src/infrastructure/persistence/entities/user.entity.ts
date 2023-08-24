import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import AccountEntity from './account.entity';

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
    unique: true,
  })
  email: string;

  @Column({
    name: 'urlImage',
    type: 'text',
    nullable: true,
  })
  urlImage: string;

  @OneToMany(() => AccountEntity, (account) => account.user, { cascade: true })
  accounts?: AccountEntity[];

  /**
   * ? Execute before save
   **/
  // @BeforeInsert()
  // checkAccountInsert() {
  //   if (!this.idAccount) {
  //     this.idAccount = '57c82836-d97b-436f-96fe-29ac15d43c05';
  //   }
  // }
}
