import { CARD_STATUS_NAME } from '../enums/status.enum';

export class UserPreferences {
  constructor(
    public cardStatusLockedUntil: { [status: string]: number },
    public dailyUnknownWords: number,
  ) {}
}

export function getDefaultUserPreferences(): UserPreferences {
  return new UserPreferences(
    {
      [CARD_STATUS_NAME.IN_LEARNING_1]: 0,
      [CARD_STATUS_NAME.IN_LEARNING_2]: 0,
      [CARD_STATUS_NAME.IN_LEARNING_3]: 0,
      [CARD_STATUS_NAME.IN_REVIEW_1]: 24,
      [CARD_STATUS_NAME.IN_REVIEW_2]: 48,
      [CARD_STATUS_NAME.IN_REVIEW_3]: 72,
      [CARD_STATUS_NAME.IN_REVIEW_4]: 96,
    },
    10,
  );
}
