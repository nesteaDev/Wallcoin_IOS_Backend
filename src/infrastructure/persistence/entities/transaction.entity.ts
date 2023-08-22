import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Transaction {
  @PrimaryGeneratedColumn('uuid', {
    name: 'idTransaction',
  })
  idTransaction: string;

  @Column('uuid', { name: 'idUser' })
  idUser: string;

  @Column('uuid', { name: 'idDestination' })
  idDestinationUser: string;

  @Column('float', { name: 'amount' })
  amount: number;

  @Column('date', { name: 'createdAtDate' })
  createdAt: Date;

  @Column('varchar', { name: 'transactionType', length: 255 })
  transactionType: string;

  // @JoinColumn({ name: 'idUser', referencedColumnName: 'idUser' })
  // userOrigin: User;

  // @JoinColumn({ name: 'idDestination', referencedColumnName: 'idUser' })
  // userDestination: User;
}
