import { EntityRepository, Repository } from 'typeorm';
import { CreateQuoteDTO } from './dto/create-quote.dto';
import { Quote } from '../../entities/quote.entity';
import { User } from 'src/entities/user.entity';

@EntityRepository(Quote)
export class QuotesRepository extends Repository<Quote> {
  async createQuote(
    createQuoteDTO: CreateQuoteDTO,
    user: User,
  ): Promise<Quote> {
    const { desc } = createQuoteDTO;

    const date = new Date();
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = date.getFullYear();

    const createdAt = dd + '-' + mm + '-' + yyyy;

    const quote = this.create({
      user,
      desc,
      createdAt,
    });

    await this.save(quote);
    return quote;
  }

  async getMostLiked(limit?: number): Promise<Quote[]> {
    const query = await this.createQueryBuilder('quote')
      .select([
        'quote.id',
        'quote.desc',
        'user.id',
        'user.firstName',
        'user.lastName',
        'vote.id',
      ])
      .innerJoin('quote.user', 'user')
      .leftJoin('quote.votes', 'vote')
      .limit(limit)
      .getMany();

    return query;
  }

  async getMostRecent(limit?: number): Promise<Quote[]> {
    const query = await this.createQueryBuilder('quote')
      .select([
        'quote.id',
        'quote.desc',
        'user.id',
        'user.firstName',
        'user.lastName',
        'vote.id',
      ])
      .innerJoin('quote.user', 'user')
      .leftJoin('quote.votes', 'vote')
      .orderBy('quote.createdAt', 'DESC')
      .limit(limit)
      .getMany();

    return query;
  }

  async getUserMostLiked(user: User, limit?: number): Promise<Quote[]> {
    const query = await this.createQueryBuilder('quote')
      .select(['quote.id', 'quote.desc', 'vote.id'])
      .innerJoin('quote.user', 'user')
      .leftJoin('quote.votes', 'vote')
      .where('user.id = :uid')
      .setParameter('uid', user.id)
      .limit(limit)
      .getMany();

    return query;
  }

  async getUserMostRecent(user: User, limit?: number): Promise<Quote[]> {
    const query = await this.createQueryBuilder('quote')
      .select(['quote.id', 'quote.desc', 'vote.id'])
      .innerJoin('quote.user', 'user')
      .leftJoin('quote.votes', 'vote')
      .where('user.id = :uid')
      .setParameter('uid', user.id)
      .orderBy('quote.createdAt', 'DESC')
      .limit(limit)
      .getMany();

    return query;
  }

  async getQuotesLikedByUser(user: User, limit?: number): Promise<Quote[]> {
    const query = await this.createQueryBuilder('quote')
      .select([
        'quote.id',
        'quote.desc',
        'user.firstName',
        'user.lastName',
        'vote.id',
      ])
      .innerJoin('quote.user', 'user')
      .leftJoin('quote.votes', 'vote')
      .where('vote.user = :uid')
      .setParameter('uid', user.id)
      .limit(limit)
      .getMany();
    return query;
  }

  async getRandomQuote(): Promise<Quote> {
    const randomQuote = await this.createQueryBuilder('quote')
      .select([
        'quote.desc',
        'quote.id',
        'user.id',
        'user.firstName',
        'user.lastName',
        'vote.id',
      ])
      .innerJoin('quote.user', 'user')
      .leftJoin('quote.votes', 'vote')
      .orderBy('RANDOM()')
      .getOne();
    return randomQuote;
  }
}
