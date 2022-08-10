import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/modules/auth/auth.module';
import { UsersRepository } from 'src/modules/user/user/users.repository';
import { QuotesModule } from 'src/modules/quotes/quotes.module';
import { QuotesRepository } from 'src/modules/quotes/quotes.repository';
import { VotesController } from './votes.controller';
import { VotesService } from './votes.service';
import { VotesRepository } from './votes.repository';

@Module({
  imports: [
    AuthModule,
    QuotesModule,
    TypeOrmModule.forFeature([
      QuotesRepository,
      UsersRepository,
      VotesRepository,
    ]),
  ],
  controllers: [VotesController],
  providers: [VotesService],
})
export class VotesModule {}
