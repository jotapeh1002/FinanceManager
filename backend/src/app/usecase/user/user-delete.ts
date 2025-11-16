import { Injectable } from '@nestjs/common';
import { UseCase } from '../../../shared/utils/iUsecase';
import { IUserContracts } from 'src/app/contracts/iUserContracts';
import { UserNotFound } from 'src/shared/errors/customErross';

@Injectable()
export class UserDelete implements UseCase<string, void> {
  constructor(private iUserContracts: IUserContracts) {}

  async exec(id: string): Promise<void> {
    const user = await this.iUserContracts.findById(id);

    if (!user) {
      throw new UserNotFound();
    }

    await this.iUserContracts.delete(user);
  }
}
