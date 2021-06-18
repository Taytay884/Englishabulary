import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserCard, UserCardDocument } from './schemas/user-card.schema';
import { CreateUserCardDto } from './dto/create-user-card.dto';
import { User, UserDocument } from '../user/schemas/user.schema';
import { Card, CardDocument } from '../card/schemas/card.schema';
import { CARD_STATUS } from '../user/enums/status.enum';

@Injectable()
export class UserCardService {
  constructor(
    @InjectModel(UserCard.name) private userCardModel: Model<UserCardDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Card.name) private cardModel: Model<CardDocument>,
  ) {}

  async create(createUserCardDto: CreateUserCardDto): Promise<User> {
    const { email, cardId } = createUserCardDto;
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new HttpException(`User doesn't exist`, HttpStatus.BAD_REQUEST);
    }
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
    return user.save();
  }

  // async findAll(): Promise<User[]> {
  //   return this.userModel.find().exec();
  // }
  //
  async findOne(id: string): Promise<UserCard> {
    const card = await this.userCardModel.findById(id).populate('card').exec();

    if (!card) {
      throw new HttpException(`Card doesn't exist`, HttpStatus.BAD_REQUEST);
    }

    return card;
  }
  //
  // async deleteOne(id: string): Promise<User> {
  //   const user = await this.userModel.findById(id).exec();
  //
  //   if (!user) {
  //     throw new HttpException(`User doesn't exist`, HttpStatus.BAD_REQUEST);
  //   }
  //
  //   await this.userModel.deleteOne({ _id: id }).exec();
  //
  //   return user;
  // }
}
