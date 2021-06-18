import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, SchemaTypes } from 'mongoose';
import {
  getDefaultUserPreferences,
  UserPreferences,
} from '../utils/preferences.util';
import { UserCard } from '../../user-card/schemas/user-card.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop([{ type: SchemaTypes.ObjectId, ref: 'UserCard', required: true }])
  cards: UserCard[];

  @Prop({ type: UserPreferences, default: getDefaultUserPreferences() })
  preferences?: UserPreferences;
}

export const UserSchema = SchemaFactory.createForClass(User);
