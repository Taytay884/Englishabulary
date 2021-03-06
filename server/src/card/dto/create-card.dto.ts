import { IsNotEmpty } from 'class-validator';

export class CreateCardDto {
  @IsNotEmpty()
  word: string;

  @IsNotEmpty()
  definition: string;

  @IsNotEmpty()
  unit: number;

  hints?: string[];
}
