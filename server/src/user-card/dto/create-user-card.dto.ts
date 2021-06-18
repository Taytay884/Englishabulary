import { IsMongoId, IsEmail } from 'class-validator';

export class CreateUserCardDto {
  @IsEmail()
  email: string;

  @IsMongoId()
  cardId: string;
}
