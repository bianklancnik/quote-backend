import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateQuoteDTO } from './dto/create-quote.dto';
import { Quote } from './quote.entity';
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

  createQuote(createQuoteDTO: CreateQuoteDTO): Promise<Quote> {
    return this.quotesRepository.createQuote(createQuoteDTO);
  }

  async deleteQuote(id: string): Promise<void> {
    const result = await this.quotesRepository.delete(id);
    if (result.affected === 0)
      throw new NotFoundException('Quote with ID ' + id + ' not found');
  }
}
