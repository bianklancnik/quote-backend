import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Quote } from './quote.entity';

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

  @OneToMany((_type) => Quote, (quote) => quote.user, { eager: true })
  quotes: Quote[];
}
