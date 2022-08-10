import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from 'src/modules/user/user/users.repository';
import { QuotesRepository } from 'src/modules/quotes/quotes.repository';
import { VotesRepository } from 'src/modules/votes/votes.repository';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      QuotesRepository,
      UsersRepository,
      VotesRepository,
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
