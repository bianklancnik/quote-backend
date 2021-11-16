import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuotesController } from './quotes.controller';
import { QuotesRepository } from './quotes.repository';
import { QuotesService } from './quotes.service';

@Module({
  imports: [TypeOrmModule.forFeature([QuotesRepository])],
  controllers: [QuotesController],
  providers: [QuotesService],
})
export class QuotesModule {}
