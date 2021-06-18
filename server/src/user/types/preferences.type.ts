export type PreferencesType = {
  cardStatusLockedUntil: {
    [status: string]: number;
  };
  dailyUnknownWords: number;
};
