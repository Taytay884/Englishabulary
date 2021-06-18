import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { Card } from './schemas/card.schema';
import { CardService } from './card.service';

@Controller('card')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post()
  async create(@Body() createCardDto: CreateCardDto) {
    await this.cardService.create(createCardDto);
  }

  @Get()
  async findAll(): Promise<Card[]> {
    return this.cardService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Card> {
    return this.cardService.findOne(id);
  }

  @Delete(':id')
  async destroy(@Param('id') id: string): Promise<Card> {
    return await this.cardService.deleteOne(id);
  }
}
