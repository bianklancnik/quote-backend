import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateQuoteDTO } from './dto/create-quote.dto';
import { UpdateQuoteDTO } from './dto/update-quote.dto';
import { Quote } from '../../entities/quote.entity';
import { QuotesRepository } from './quotes.repository';
import { User } from 'src/entities/user.entity';

@Injectable()
export class QuotesService {
  constructor(
    @InjectRepository(QuotesRepository)
    private quotesRepository: QuotesRepository,
  ) {}

  async getQuoteById(id: string): Promise<Quote> {
    const found = await this.quotesRepository.findOne(id);

    if (!found) {
      throw new NotFoundException('Quote with ID ' + id + ' not found');
    }
    return found;
  }

  createQuote(createQuoteDTO: CreateQuoteDTO, user: User): Promise<Quote> {
    return this.quotesRepository.createQuote(createQuoteDTO, user);
  }

  async deleteQuote(id: string): Promise<void> {
    const result = await this.quotesRepository.delete(id);
    if (result.affected === 0)
      throw new NotFoundException('Quote with ID ' + id + ' not found');
  }

  async updateQuote(
    id: string,
    updateQuoteDTO: UpdateQuoteDTO,
  ): Promise<Quote> {
    const quote = await this.getQuoteById(id);

    const { title, desc } = updateQuoteDTO;
    if (typeof title !== 'undefined') {
      quote.title = title;
    }
    if (typeof desc !== 'undefined') {
      quote.desc = desc;
    }

    await this.quotesRepository.save(quote);

    return quote;
  }

  async upvoteQuote(id: string): Promise<Quote> {
    const quote = await this.getQuoteById(id);

    quote.upvotes++;
    await this.quotesRepository.save(quote);

    return quote;
  }

  async downvoteQuote(id: string): Promise<Quote> {
    const quote = await this.getQuoteById(id);

    quote.downvotes++;
    await this.quotesRepository.save(quote);

    return quote;
  }
}
