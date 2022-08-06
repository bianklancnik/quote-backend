import { Exclude } from 'class-transformer';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Quote } from './quote.entity';
import { User } from './user.entity';

@Entity()
export class Vote {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  vote: number;

  @ManyToOne(() => User, (user) => user.votes, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;

  @ManyToOne(() => Quote, (quote) => quote.votes, { eager: false })
  @Exclude({ toPlainOnly: true })
  quote: Quote;
}
