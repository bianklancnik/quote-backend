import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateQuoteDTO } from './dto/create-quote.dto';
import { UpdateQuoteDTO } from './dto/update-quote.dto';
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

  @Delete('myquote/:id')
  deleteQuote(@Param('id') id: string): Promise<void> {
    return this.quotesService.deleteQuote(id);
  }

  @Patch('myquote/:id')
  updateQuote(
    @Param('id') id: string,
    @Body() updateQuoteDTO: UpdateQuoteDTO,
  ): Promise<Quote> {
    return this.quotesService.updateQuote(id, updateQuoteDTO);
  }
}
