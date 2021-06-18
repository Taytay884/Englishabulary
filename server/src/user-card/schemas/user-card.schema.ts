import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, SchemaTypes } from 'mongoose';
import { Card } from '../../card/schemas/card.schema';

export type UserCardDocument = UserCard & Document;

@Schema()
export class UserCard {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Card', required: true })
  card: Card;

  @Prop({ required: true })
  status: number;

  @Prop({ required: true, default: Date() })
  lockedUntil: Date;
}

export const UserCardSchema = SchemaFactory.createForClass(UserCard);
