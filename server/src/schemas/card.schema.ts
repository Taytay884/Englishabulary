import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CardDocument = Card & Document;

@Schema()
export class Card {
  @Prop({ required: true })
  word: string;

  @Prop({ required: true })
  definition: string;

  @Prop([String])
  hints: string[];
}

export const CardSchema = SchemaFactory.createForClass(Card);
