import { Module } from '@nestjs/common';
import { QuotesModule } from './modules/quotes/quotes.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { VotesModule } from './modules/votes/votes.module';
import { UserModule } from './modules/user/user/user.module';

@Module({
  imports: [
    QuotesModule,
    AuthModule,
    VotesModule,
    UserModule,
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
