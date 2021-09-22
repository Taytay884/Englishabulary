import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// import { UserCard, UserCardDocument } from './schemas/user-card.schema';
// import { CreateUserCardDto } from './dto/create-user-card.dto';
import { User, UserDocument } from '../user/schemas/user.schema';
import { Card, CardDocument } from '../card/schemas/card.schema';
import { UserCardService } from '../user-card/user-card.service';

@Injectable()
export class StudyService {
  constructor(
    // @InjectModel(UserCard.name) private userCardModel: Model<UserCardDocument>,
    private userCardService: UserCardService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Card.name) private cardModel: Model<CardDocument>,
  ) {}

  async fetchNextCard(userId: string, unit: number) {
    return await this.userCardService.getNextUnlockedUserCard(userId, unit);
  }

  async fetchAllCards(
    unit: number,
    fromStatus: number,
    toStatus: number,
    limit: number,
  ) {
    const aggregation = await this.userModel.aggregate([
      { $match: { email: 'taytay884@yahoo.com' } },
      {
        $lookup: {
          from: 'usercards',
          localField: 'cards',
          foreignField: '_id',
          as: 'userCards',
        },
      },
      {
        $project: {
          email: 1,
          userCards: {
            $filter: {
              input: '$userCards',
              as: 'userCard',
              cond: {
                $and: [
                  { $lt: ['$$userCard.lockedUntil', new Date()] },
                  { $gte: ['$$userCard.status', fromStatus] },
                  { $lte: ['$$userCard.status', toStatus] },
                ],
              },
            },
          },
        },
      },
      {
        $project: {
          email: 1,
          userCards: { $slice: ['$userCards', 0, limit] },
        },
      },
      {
        $lookup: {
          from: 'cards',
          localField: 'userCards.card',
          foreignField: '_id',
          as: 'cards',
        },
      },
      {
        $project: {
          email: 1,
          userCards: {
            $map: {
              input: '$userCards',
              as: 'userCard',
              in: {
                $mergeObjects: [
                  '$$userCard',
                  {
                    $arrayElemAt: [
                      {
                        $filter: {
                          input: '$cards',
                          as: 'card',
                          cond: {
                            $eq: ['$$card._id', '$$userCard.card'],
                          },
                        },
                      },
                      0,
                    ],
                  },
                ],
              },
            },
          },
        },
      },
    ]);
    return aggregation[0].userCards;
  }

  async addUnknownCardsToUser(userId: string, unit: number, amount: number) {
    const unlockedUserCards = await this.userCardService.getUnlockedUserCards(
      userId,
      unit,
      amount,
    );
    if (unlockedUserCards.length < 7) {
      await this.userCardService.addNewCardsToUser(
        userId,
        unit,
        7 - unlockedUserCards.length,
      );
    }
  }
}
