import { EntityRepository, Repository } from 'typeorm';
import { CreateQuoteDTO } from './dto/create-quote.dto';
import { Quote } from '../../entities/quote.entity';

@EntityRepository(Quote)
export class QuotesRepository extends Repository<Quote> {
  async createQuote(createQuoteDTO: CreateQuoteDTO): Promise<Quote> {
    const { title, desc } = createQuoteDTO;

    const quote = this.create({
      title,
      desc,
      upvotes: 0,
      downvotes: 0,
    });

    await this.save(quote);
    return quote;
  }
}
