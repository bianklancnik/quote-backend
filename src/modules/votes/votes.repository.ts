import { EntityRepository, Repository } from 'typeorm';
import { Vote } from 'src/entities/vote.entity';
import { Quote } from 'src/entities/quote.entity';
import { User } from 'src/entities/user.entity';
import { ConflictException } from '@nestjs/common';

@EntityRepository(Vote)
export class VotesRepository extends Repository<Vote> {
  async upvoteQuote(quote: Quote, user: User): Promise<Vote> {
    const currentVote = await this.findOne({ user, quote });
    if (!currentVote) {
      const vote = new Vote();
      vote.quote = quote;
      vote.user = user;
      this.removeUserValues(vote);
      return await this.save(vote);
    } else throw new ConflictException('Already upvoted!');
  }

  removeUserValues = (vote: Vote) => {
    const user = Object.keys(vote.user);
    user.forEach((value) => {
      if (
        value === 'firstName' ||
        value === 'lastName' ||
        value === 'email' ||
        value === 'password'
      ) {
        delete vote.user[value];
      }
    });
  };
}
