import { useCase } from '@infrastructure/IoC';

@useCase('healcheck')
class HealCheck {
  public execute(): boolean {
    return true;
  }
}

export default HealCheck;
