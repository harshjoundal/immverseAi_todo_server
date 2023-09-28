import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'harshjoundal@gmail.com',
        pass: `${process.env.GMAIL_PASSWORD}`,
      },
    });
  }

  async sendEmail(to: string, subject: string, text: string): Promise<void> {
    await this.transporter.sendMail({
      from: 'harshjoundal@gmail.com',
      to,
      subject,
      text,
    });
  }
}
