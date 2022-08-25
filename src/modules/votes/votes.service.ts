import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Vote } from 'src/entities/vote.entity';
import { QuotesRepository } from '../quotes/quotes.repository';
import { VotesRepository } from './votes.repository';

@Injectable()
export class VotesService {
  constructor(
    @InjectRepository(VotesRepository)
    private votesRepository: VotesRepository,
    private quotesRepository: QuotesRepository,
  ) {}

  async upvoteQuote(id: string, user: User): Promise<Vote> {
    user.quotes.map((quote) => {
      if (quote.id === id)
        throw new ConflictException('You can not upvote your own quote!');
    });
    const quote = await this.quotesRepository.findOne(id);

    if (!quote) throw new NotFoundException('Quote not found');
    return this.votesRepository.upvoteQuote(quote, user);
  }

  async downvoteQuote(id: string, user: User): Promise<void> {
    const quote = await this.quotesRepository.findOne(id);

    if (!quote) throw new NotFoundException('Quote not found');

    const currentVote = await this.votesRepository.findOne({ user, quote });
    if (currentVote) await this.votesRepository.delete(currentVote);
    else throw new NotFoundException('Vote with ID ' + id + ' not found');
  }
}
