import { EntityRepository, Repository } from 'typeorm';
import { Vote } from 'src/entities/vote.entity';
import { Quote } from 'src/entities/quote.entity';
import { User } from 'src/entities/user.entity';

@EntityRepository(Vote)
export class VotesRepository extends Repository<Vote> {
  async upvoteQuote(quote: Quote, user: User): Promise<Vote> {
    const currentVote = await this.findOne({ user, quote });
    if (!currentVote) {
      const vote = new Vote();
      vote.quote = quote;
      vote.user = user;
      vote.vote = 1;
      this.removeKeys(vote);
      console.log(vote);
      return await this.save(vote);
    } else {
      currentVote.quote = quote;
      currentVote.user = user;
      currentVote.vote = 1;
      this.removeKeys(currentVote);
      console.log(currentVote);
      return await this.save(currentVote);
    }
  }

  async downvoteQuote(quote: Quote, user: User): Promise<Vote> {
    const currentVote = await this.findOne({ user, quote });
    if (!currentVote) {
      const vote = new Vote();
      vote.quote = quote;
      vote.user = user;
      vote.vote = -1;
      this.removeKeys(vote);
      console.log(vote);
      return await this.save(vote);
    } else {
      currentVote.quote = quote;
      currentVote.user = user;
      currentVote.vote = -1;
      this.removeKeys(currentVote);
      console.log(currentVote);
      return await this.save(currentVote);
    }
  }

  removeKeys = (vote: Vote) => {
    const userKeys = Object.keys(vote.user);
    userKeys.forEach((userKey) => {
      if (
        userKey == 'firstName' ||
        userKey == 'lastName' ||
        userKey == 'email' ||
        userKey == 'password'
      ) {
        delete vote.user[userKey];
      }
    });
  };
}
