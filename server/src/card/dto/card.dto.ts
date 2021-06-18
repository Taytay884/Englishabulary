import { IsNotEmpty } from 'class-validator';

export class CardDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  word: string;

  @IsNotEmpty()
  definition: string;

  unit: number;

  hints?: string[];
}
