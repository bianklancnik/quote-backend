import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateQuoteDTO } from './dto/create-quote.dto';
import { UpdateQuoteDTO } from './dto/update-quote.dto';
import { Quote } from '../../entities/quote.entity';
import { QuotesService } from './quotes.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from 'src/entities/user.entity';

@Controller('')
export class QuotesController {
  constructor(private quotesService: QuotesService) {}

  @Get('/:id')
  getQuoteById(@Param('id') id: string): Promise<Quote> {
    return this.quotesService.getQuoteById(id);
  }

  @Post('myquote')
  @UseGuards(AuthGuard())
  createQuote(
    @Body() createQuoteDTO: CreateQuoteDTO,
    @GetUser() user: User,
  ): Promise<Quote> {
    return this.quotesService.createQuote(createQuoteDTO, user);
  }

  @Delete('myquote/:id')
  @UseGuards(AuthGuard())
  deleteQuote(@Param('id') id: string): Promise<void> {
    return this.quotesService.deleteQuote(id);
  }

  @Patch('myquote/:id')
  @UseGuards(AuthGuard())
  updateQuote(
    @Param('id') id: string,
    @Body() updateQuoteDTO: UpdateQuoteDTO,
  ): Promise<Quote> {
    return this.quotesService.updateQuote(id, updateQuoteDTO);
  }

  @Patch('myquote/:id/upvote')
  @UseGuards(AuthGuard())
  upvoteQuote(@Param('id') id: string): Promise<Quote> {
    return this.quotesService.upvoteQuote(id);
  }

  @Patch('myquote/:id/downvote')
  @UseGuards(AuthGuard())
  downvoteQuote(@Param('id') id: string): Promise<Quote> {
    return this.quotesService.downvoteQuote(id);
  }
}
