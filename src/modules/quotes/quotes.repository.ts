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
      upvotes: 0,
      downvotes: 0,
    });

    await this.save(quote);
    return quote;
  }
}
