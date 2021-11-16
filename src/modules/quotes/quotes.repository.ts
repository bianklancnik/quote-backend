import { EntityRepository, Repository } from 'typeorm';
import { Quote } from './quote.entity';

@EntityRepository(Quote)
export class QuotesRepository extends Repository<Quote> {}
