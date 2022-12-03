import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { News, RedactNewsDto } from 'src/news/dto/news.dto';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMailAboutFreshNews(users: EmailUser[], news: News) {
    for (const user of users) {
      await this.mailerService.sendMail({
        to: user.email,
        subject: 'Fresh News!',
        context: {
          user,
          news,
        },
        template: './new-news',
      });
    }
  }

  async sendMailAboutUpdatedNews(
    users: EmailUser[],
    originalNews: News,
    updatedNews: RedactNewsDto,
  ) {
    const changes: { original: string; updated: string }[] = [];
    for (const key in originalNews) {
      if (originalNews[key] !== updatedNews[key]) {
        changes.push({
          original: originalNews[key],
          updated: updatedNews[key],
        });
      }
    }
    for (const user of users) {
      await this.mailerService.sendMail({
        to: user.email,
        subject: 'Updated News!',
        context: {
          user,
          changes,
          id: originalNews.id,
        },
        template: './update-news',
      });
    }
  }
}

interface EmailUser {
  name: string;
  email: string;
}
