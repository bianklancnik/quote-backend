import { Controller, Get } from '@nestjs/common';
import { Quote } from 'src/entities/quote.entity';
import { User } from 'src/entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('list')
  getUsersAndQuotesList(): Promise<User[]> {
    return this.userService.getList();
  }

  @Get('random-quote')
  getRandomQuote(): Promise<User> {
    return this.userService.getRandomQuote();
  }

  @Get('liked')
  getLikedQuotes(): Promise<Quote[]> {
    return null;
  }

  @Get('most-liked')
  getMostLikedQuotes(): Promise<Quote[]> {
    return null;
  }
}
