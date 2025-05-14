import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CredsService {
  async passwordhash(password: string): Promise<string> {
    return await bcrypt.hash(process.env.PSW_TEXT + password, 10);
  }

  async passwordMatch(password: string, hashed: string): Promise<boolean> {
    return await bcrypt.compare(process.env.PSW_TEXT + password, hashed);
  }
}
