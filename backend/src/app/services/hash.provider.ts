import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CriptoProvider {
  async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async compare(password: string, passwordCripto: string): Promise<boolean> {
    return await bcrypt.compare(password, passwordCripto);
  }
}
