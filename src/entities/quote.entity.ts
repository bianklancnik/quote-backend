import { Exclude } from 'class-transformer';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Quote {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  desc: string;

  @Column()
  upvotes: number;

  @Column()
  downvotes: number;

  @ManyToOne((_type) => User, (user) => user.quotes, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;
}
