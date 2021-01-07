import { NextFunction, Request, Response } from 'express';
import { inject } from 'inversify';

import HealCheck from '@domain/usecases/statistics/healcheck.usecase';
import { controller } from '@infrastructure/IoC';

@controller('statistics')
class Statistics {
  public constructor(
    @inject('useCase.healcheck') private useCaseHealCheck: HealCheck
  ) {
    this.useCaseHealCheck = useCaseHealCheck;
  }

  public healcheck = (_: Request, res: Response, next: NextFunction): void => {
    const isLive = this.useCaseHealCheck.execute();

    res.status(200).json({
      isLive,
    });

    next();
  };
}

export default Statistics;
