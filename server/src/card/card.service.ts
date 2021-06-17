import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCardDto } from './dto/create-cat.dto';
import { Card, CardDocument } from '../schemas/card.schema';

@Injectable()
export class CardService {
  constructor(@InjectModel(Card.name) private cardModel: Model<CardDocument>) {}

  async create(createCatDto: CreateCardDto): Promise<Card> {
    const createdCard = new this.cardModel(createCardDto);
    return createdCard.save();
  }

  async findAll(): Promise<Card[]> {
    return this.cardModel.find().exec();
  }
}
