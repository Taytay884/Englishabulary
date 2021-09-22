import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserCard, UserCardDocument } from './schemas/user-card.schema';
import { CreateUserCardDto } from './dto/create-user-card.dto';
import { User, UserDocument } from '../user/schemas/user.schema';
import { Card, CardDocument } from '../card/schemas/card.schema';
import { CARD_STATUS } from '../user/enums/status.enum';
import { map } from 'rxjs/operators';

type getAllUserCardsQuery = {
  _id: { $in: UserCard[] };
  lockedUntil?: { $lt: Date };
};

@Injectable()
export class UserCardService {
  constructor(
    @InjectModel(UserCard.name) private userCardModel: Model<UserCardDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Card.name) private cardModel: Model<CardDocument>,
  ) {}

  async create(userId: string, cardIds: string[]): Promise<string[]> {
    const createdUserCardIds: string[] = [];
    const user = await this.userModel.findOne({ _id: userId });
    if (!user) {
      throw new HttpException(`User doesn't exist`, HttpStatus.BAD_REQUEST);
    }
    for (let cardId of cardIds) {
      const card = await this.cardModel.findOne({ _id: cardId });
      if (!card) {
        throw new HttpException(`Card doesn't exist`, HttpStatus.BAD_REQUEST);
      }
      const userCard = {
        card,
        status: CARD_STATUS.UNKNOWN,
        lockedUntil: new Date('01-01-2000'),
      };
      const createdUserCard = new this.userCardModel(userCard);
      await createdUserCard.save();
      user.cards.push(createdUserCard);
      createdUserCardIds.push(createdUserCard._id);
    }
    await user.save();
    return createdUserCardIds;
  }

  async findOne(id: string): Promise<UserCard> {
    const card = await this.userCardModel.findById(id).populate('card').exec();

    if (!card) {
      throw new HttpException(`Card doesn't exist`, HttpStatus.BAD_REQUEST);
    }

    return card;
  }

  async getNextUnlockedUserCard(userId: string, unit: number) {
    const result = await this.getUnlockedUserCards(userId, unit, 1);
    return result[0];
  }

  async getUnlockedUserCards(userId: string, unit: number, limit?: number) {
    const user = await this.userModel.findOne({ _id: userId });
    if (!user) {
      throw new HttpException(`User doesn't exist`, HttpStatus.BAD_REQUEST);
    }
    const aggregationArray: any[] = [
      {
        $match: { _id: { $in: user.cards }, lockedUntil: { $lt: new Date() } },
      },
      {
        $lookup: {
          from: 'cards',
          localField: 'card',
          foreignField: '_id',
          as: 'cardContent',
        },
      },
      { $unwind: '$cardContent' },
      {
        $project: {
          _id: 1,
          card: 1,
          status: 1,
          unit: '$cardContent.unit',
          hints: '$cardContent.hints',
          word: '$cardContent.word',
          definition: '$cardContent.definition',
        },
      },
      { $match: { unit } },
    ];
    if (limit) {
      aggregationArray.push({ $limit: limit });
    }
    return this.userCardModel.aggregate(aggregationArray);
    // return this.userCardModel.findOne(
    //   { _id: { $in: user.cards }, lockedUntil: { $lt: new Date() } },
    //   null,
    //   {
    //     sort: { status: -1 },
    //   },
    // );
  }

  async getAllUserCards(userId: string, unlockedCardsOnly?: boolean) {
    const user = await this.userModel.findOne({ _id: userId }).exec();
    if (!user) {
      throw new HttpException(`User doesn't exist`, HttpStatus.BAD_REQUEST);
    }

    const findCardsQuery: getAllUserCardsQuery = { _id: { $in: user.cards } };
    if (unlockedCardsOnly) {
      findCardsQuery.lockedUntil = { $lt: new Date() };
    }

    return this.userCardModel.find(findCardsQuery);
  }

  async addNewCardsToUser(userId: string, unit: number, amount: number) {
    const user = await this.userModel
      .findOne({ _id: userId })
      .populate('cards')
      .exec();
    const userOwnedCardIds = user.cards.map((userCard: UserCardDocument) => {
      return userCard.card;
    });
    const notUserOwnedCards: any[] = await this.cardModel
      .find({
        _id: { $nin: userOwnedCardIds },
        unit,
      })
      .limit(amount)
      .lean();
    const notUserOwnedCardIds = notUserOwnedCards.map((card: CardDocument) => {
      return card._id.toString();
    });
    return this.create(userId, notUserOwnedCardIds);
  }
}
