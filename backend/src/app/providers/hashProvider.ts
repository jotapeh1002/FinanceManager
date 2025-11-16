import { IHashProviders } from '../interfaces/iHashProviders';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { HashError } from 'src/shared/errors/customErross';

@Injectable()
export class HashProvider extends IHashProviders {
  async hash(password: string): Promise<string> {
    try {
      return await bcrypt.hash(password, 10);
    } catch (error: unknown) {
      throw new HashError(error);
    }
  }

  async compare(password: string, passwordCripto: string): Promise<boolean> {
    try {
      return await bcrypt.compare(password, passwordCripto);
    } catch (error: unknown) {
      throw new HashError(error);
    }
  }
}
