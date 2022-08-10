import { Exclude } from 'class-transformer';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Vote } from './vote.entity';

@Entity()
export class Quote {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  desc: string;

  @ManyToOne(() => User, (user) => user.quotes, {
    eager: false,
    onDelete: 'CASCADE',
  })
  @Exclude({ toPlainOnly: true })
  user: User;

  @OneToMany(() => Vote, (vote) => vote.quote, {
    eager: true,
    onDelete: 'CASCADE',
  })
  votes: Vote[];
}
