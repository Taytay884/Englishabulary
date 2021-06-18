import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCardDto } from './dto/create-card.dto';
import { Card, CardDocument } from './schemas/card.schema';

@Injectable()
export class CardService {
  constructor(@InjectModel(Card.name) private cardModel: Model<CardDocument>) {}

  async create(createCardDto: CreateCardDto): Promise<Card> {
    const createdCard = new this.cardModel(createCardDto);
    return createdCard.save();
  }

  async findAll(): Promise<Card[]> {
    return this.cardModel.find().exec();
  }

  async findOne(id: string): Promise<Card> {
    const card = await this.cardModel.findById(id).exec();

    if (!card) {
      throw new HttpException(`Card doesn't exist`, HttpStatus.BAD_REQUEST);
    }

    return card;
  }

  async deleteOne(id: string): Promise<Card> {
    const card = await this.cardModel.findById(id).exec();

    if (!card) {
      throw new HttpException(`Card doesn't exist`, HttpStatus.BAD_REQUEST);
    }

    await this.cardModel.deleteOne({ _id: id }).exec();

    return card;
  }
}
