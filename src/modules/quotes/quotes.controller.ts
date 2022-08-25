import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateQuoteDTO } from './dto/create-quote.dto';
import { UpdateQuoteDTO } from './dto/update-quote.dto';
import { Quote } from '../../entities/quote.entity';
import { QuotesService } from './quotes.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from 'src/entities/user.entity';
import { PaginationParams } from 'src/utils/types/pagination-params';

@Controller('myquote')
export class QuotesController {
  constructor(private quotesService: QuotesService) {}

  @Get('most-liked')
  getMostLikedQuotes(@Query() { limit }: PaginationParams): Promise<Quote[]> {
    return this.quotesService.getMostLiked(limit);
  }

  @Get('most-recent')
  getMostRecentQuotes(@Query() { limit }: PaginationParams): Promise<Quote[]> {
    return this.quotesService.getMostRecent(limit);
  }

  @Get('user/most-liked')
  @UseGuards(AuthGuard())
  getUserMostLikedQuotes(
    @GetUser() user: User,
    @Query() { limit }: PaginationParams,
  ): Promise<Quote[]> {
    return this.quotesService.getUserMostLiked(user, limit);
  }

  @Get('user/most-recent')
  @UseGuards(AuthGuard())
  getUserMostRecentQuotes(
    @GetUser() user: User,
    @Query() { limit }: PaginationParams,
  ): Promise<Quote[]> {
    return this.quotesService.getUserMostRecent(user, limit);
  }

  @Get('user/liked')
  @UseGuards(AuthGuard())
  getQuotesLikedByUser(
    @GetUser() user: User,
    @Query() { limit }: PaginationParams,
  ): Promise<Quote[]> {
    return this.quotesService.getQuotesLikedByUser(user, limit);
  }

  @Get('random-quote')
  getRandomQuote(): Promise<Quote> {
    return this.quotesService.getRandomQuote();
  }

  @Get(':id')
  getQuoteById(@Param('id') id: string): Promise<Quote> {
    return this.quotesService.getQuoteById(id);
  }

  @Post('')
  @UseGuards(AuthGuard())
  createQuote(
    @Body() createQuoteDTO: CreateQuoteDTO,
    @GetUser() user: User,
  ): Promise<Quote> {
    return this.quotesService.createQuote(createQuoteDTO, user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  deleteQuote(@Param('id') id: string): Promise<void> {
    return this.quotesService.deleteQuote(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  updateQuote(
    @Param('id') id: string,
    @Body() updateQuoteDTO: UpdateQuoteDTO,
  ): Promise<Quote> {
    return this.quotesService.updateQuote(id, updateQuoteDTO);
  }
}
