import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Quote } from './quote.entity';
import { Vote } from './vote.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @OneToMany(() => Quote, (quote) => quote.user, { eager: true })
  quotes: Quote[];

  @OneToMany(() => Vote, (vote) => vote.user, { eager: true })
  votes: Vote[];
}
