import { Module } from '@nestjs/common';
import { QuotesModule } from './modules/quotes/quotes.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    QuotesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Pr3s3nt-90',
      database: 'quotes',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
})
export class AppModule {}
