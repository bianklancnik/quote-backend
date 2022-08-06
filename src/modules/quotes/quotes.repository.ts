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

    const quote = this.create({
      user,
      desc,
      votes: [],
    });

    await this.save(quote);
    return quote;
  }

  async getList(): Promise<Quote[]> {
    const quote = await this.createQueryBuilder('quote')
      .select('quote.id')
      .addSelect('quote.desc')
      .addSelect('user.id')
      .addSelect('user.firstName')
      .addSelect('user.lastName')
      .addSelect('vote.vote')
      .innerJoin('quote.user', 'user')
      .leftJoin('quote.votes', 'vote')
      .getMany();
    return quote;
  }
}
