import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, SchemaTypes } from 'mongoose';
import { UserSchema } from '../../user/schemas/user.schema';

export type CardDocument = Card & Document;

@Schema()
export class Card {
  @Prop({ required: true })
  word: string;

  @Prop({ required: true })
  definition: string;

  @Prop({ required: true })
  unit: number;

  @Prop([String])
  hints?: string[];
}

export const CardSchema = SchemaFactory.createForClass(Card);
