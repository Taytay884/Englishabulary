import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserCardService } from './user-card.service';
import { CreateUserCardDto } from './dto/create-user-card.dto';
import { UserCard } from './schemas/user-card.schema';

@Controller('user-card')
export class UserCardController {
  constructor(private readonly userCardService: UserCardService) {}

  // @Get()
  // async findAll(): Promise<Card[]> {
  //     return this.cardService.findAll();
  // }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserCard> {
    return this.userCardService.findOne(id);
  }

  // @Delete(':id')
  // async destroy(@Param('id') id: string): Promise<Card> {
  //     return await this.cardService.deleteOne(id);
  // }
}
