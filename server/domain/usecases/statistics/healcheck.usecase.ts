import { useCase } from '@infrastructure/IoC';

@useCase('healcheck')
class HealCheck {
  constructor() {
    console.log('run');
  }

  public execute(): boolean {
    return true;
  }
}

export default HealCheck;
