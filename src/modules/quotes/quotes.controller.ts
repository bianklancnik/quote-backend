import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateQuoteDTO } from './dto/create-quote.dto';
import { Quote } from './quote.entity';
import { QuotesService } from './quotes.service';

@Controller('')
export class QuotesController {
  constructor(private quotesService: QuotesService) {}

  @Get('/:id')
  getQuoteById(@Param('id') id: string): Promise<Quote> {
    return this.quotesService.getQuoteById(id);
  }

  @Post('myquote')
  createQuote(@Body() createQuoteDTO: CreateQuoteDTO): Promise<Quote> {
    return this.quotesService.createQuote(createQuoteDTO);
  }
}