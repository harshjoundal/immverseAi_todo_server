
import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class OtpService {
  generateOtp(): string {
    return crypto.randomBytes(6).toString('hex').toUpperCase();
  }
}
