import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EncryptionService {
  async encryptPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async decryptPassword(
    storedPassword: string,
    password: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, storedPassword);
  }
}
