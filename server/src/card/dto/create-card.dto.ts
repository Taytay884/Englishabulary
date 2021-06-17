import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateCardDto {
  @IsNotEmpty()
  name: string;

  @MaxLength(500)
  description?: string;
}
