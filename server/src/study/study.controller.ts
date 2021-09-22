import { Controller, Get, Param, Request } from '@nestjs/common';
import { StudyService } from './study.service';

@Controller('study')
export class StudyController {
  constructor(private readonly studyService: StudyService) {}

  // Should send with the unit number.
  @Get('next/:unit')
  async getNextCard(
    @Request() req: { user: { userId: string; email: string } },
    @Param('unit') unit: string,
  ) {
    const unitAsNumber = Number(unit);
    const userId = req.user.userId;
    const card = await this.studyService.fetchNextCard(userId, unitAsNumber);
    if (card) {
      return card;
    }
    // const isUserDoneDailyStudy = userDailyStudyConfig <= userDoneTasks
    // We need to check if user done his daily work and respond with something accordingly
    // We will ask if the user want to study more, but first we will tell him he done his daily study.
    await this.fetchMoreCards(userId, unitAsNumber, 7); // should be 7 - userDoneTasks
    const cardExist = await this.studyService.fetchNextCard(
      userId,
      unitAsNumber,
    );
    return cardExist;
  }

  async fetchMoreCards(userId: string, unit: number, amount: number) {
    // const userDailyCardsToStudy = 7;
    // const inReviewStatus = 6;
    // const inReviewLastStatus = 9;
    // const unknownStatus = 1;
    // const inLearningLastStatus = 5;
    // const knownCards = await this.studyService.fetchAllCards(
    //   unit,
    //   inReviewStatus,
    //   inReviewLastStatus,
    //   userDailyCardsToStudy,
    // );
    // if (knownCards.length >= userDailyCardsToStudy) {
    //   return knownCards;
    // }
    // const unknownCards = await this.studyService.fetchAllCards(
    //   unit,
    //   unknownStatus,
    //   inLearningLastStatus,
    //   userDailyCardsToStudy - knownCards.length,
    // );
    // if (knownCards.length + unknownCards.length >= userDailyCardsToStudy) {
    //   return [...knownCards, ...unknownCards];
    // }
    await this.studyService.addUnknownCardsToUser(userId, unit, amount);
    // const newUnknownCards = await this.studyService.fetchAllCards(
    //   unknownStatus,
    //   inLearningLastStatus,
    //   userDailyCardsToStudy - knownCards.length,
    // );
    // return [...knownCards, ...newUnknownCards];
  }
}
