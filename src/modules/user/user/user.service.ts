import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UsersRepository } from 'src/modules/user/user/users.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
  ) {}

  async getList(): Promise<User[]> {
    const quotes = await this.usersRepository
      .createQueryBuilder()
      .select([
        'user.id',
        'user.firstName',
        'user.lastName',
        'quote.id',
        'quote.desc',
        'vote.id',
      ])
      .from(User, 'user')
      .innerJoin('user.quotes', 'quote')
      .leftJoin('quote.votes', 'vote')
      .getMany();

    return quotes;
  }

  async getRandomQuote(): Promise<User> {
    const userQuote = await this.usersRepository
      .createQueryBuilder()
      .select([
        'quote.desc',
        'quote.id',
        'user.firstName',
        'user.lastName',
        'vote.id',
      ])
      .from(User, 'user')
      .innerJoin('user.quotes', 'quote')
      .leftJoin('quote.votes', 'vote')
      .orderBy('RANDOM()')
      .limit(1)
      .getOne();
    return userQuote;
  }
}
