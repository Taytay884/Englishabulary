import { Module } from '@nestjs/common';
import { StudyService } from './study.service';
import { StudyController } from './study.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Card, CardSchema } from '../card/schemas/card.schema';
import {
  UserCard,
  UserCardSchema,
} from '../user-card/schemas/user-card.schema';
import { User, UserSchema } from '../user/schemas/user.schema';
import { UserCardController } from '../user-card/user-card.controller';
import { UserCardService } from '../user-card/user-card.service';
import { CardService } from '../card/card.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserCard.name, schema: UserCardSchema },
      { name: User.name, schema: UserSchema },
      { name: Card.name, schema: CardSchema },
    ]),
  ],
  providers: [StudyService, UserCardService, CardService],
  controllers: [StudyController],
})
export class StudyModule {}
