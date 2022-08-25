import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { QuotesModule } from './modules/quotes/quotes.module';
import { UserModule } from './modules/user/user/user.module';
import { VotesModule } from './modules/votes/votes.module';
import { TypeOrmConfigService } from './shared/typeorm/typeorm.service';

@Module({
  imports: [
    QuotesModule,
    AuthModule,
    VotesModule,
    UserModule,
    ConfigModule.forRoot({
      envFilePath: 'src/common/envs/.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
  ],
})
export class AppModule {}
