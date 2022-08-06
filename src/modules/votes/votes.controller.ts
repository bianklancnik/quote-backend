import { Controller, Param, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/entities/user.entity';
import { Vote } from 'src/entities/vote.entity';
import { GetUser } from '../auth/get-user.decorator';
import { VotesService } from './votes.service';

@Controller('vote')
export class VotesController {
  constructor(private votesService: VotesService) {}

  @Patch(':id/upvote')
  @UseGuards(AuthGuard())
  upvoteQuote(@Param('id') id: string, @GetUser() user: User): Promise<Vote> {
    return this.votesService.upvoteQuote(id, user);
  }

  @Patch(':id/downvote')
  @UseGuards(AuthGuard())
  downvoteQuote(@Param('id') id: string, @GetUser() user: User): Promise<Vote> {
    return this.votesService.downvoteQuote(id, user);
  }
}
