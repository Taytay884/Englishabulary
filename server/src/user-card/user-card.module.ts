import { Module } from '@nestjs/common';
import { UserCardService } from './user-card.service';
import { UserCardController } from './user-card.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserCard, UserCardSchema } from './schemas/user-card.schema';
import { User, UserSchema } from '../user/schemas/user.schema';
import { Card, CardSchema } from '../card/schemas/card.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserCard.name, schema: UserCardSchema },
      { name: User.name, schema: UserSchema },
      { name: Card.name, schema: CardSchema },
    ]),
  ],
  providers: [UserCardService],
  controllers: [UserCardController],
})
export class UserCardModule {}
