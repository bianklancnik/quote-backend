import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Quote } from '../../entities/quote.entity';
import { CreateQuoteDTO } from './dto/create-quote.dto';
import { UpdateQuoteDTO } from './dto/update-quote.dto';
import { QuotesRepository } from './quotes.repository';

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

    const { desc } = updateQuoteDTO;
    if (typeof desc !== 'undefined') {
      quote.desc = desc;
    }

    await this.quotesRepository.save(quote);

    return quote;
  }

  async getRandomQuote(): Promise<Quote> {
    return this.quotesRepository.getRandomQuote();
  }

  async getMostLiked(limit?: number): Promise<Quote[]> {
    return this.quotesRepository.getMostLiked(limit);
  }

  async getMostRecent(limit?: number): Promise<Quote[]> {
    return this.quotesRepository.getMostRecent(limit);
  }

  async getUserMostLiked(user: User, limit?: number): Promise<Quote[]> {
    return this.quotesRepository.getUserMostLiked(user, limit);
  }

  async getUserMostRecent(user: User, limit?: number): Promise<Quote[]> {
    return this.quotesRepository.getUserMostRecent(user, limit);
  }

  async getQuotesLikedByUser(user: User, limit?: number): Promise<Quote[]> {
    return this.quotesRepository.getQuotesLikedByUser(user, limit);
  }
}
