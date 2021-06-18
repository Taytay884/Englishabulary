import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CardModule } from './card/card.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { UserCardModule } from './user-card/user-card.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017'), CardModule, UserModule, UserCardModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
