import { Module } from '@nestjs/common';
import { CommentModule } from 'src/comment/modules/comment.module';
import { MailModule } from 'src/mail/modules/mail.module';
import { NewsController } from '../controllers/news.controller';
import { NewsService } from '../services/news.service';

@Module({
  imports: [CommentModule, MailModule],
  controllers: [NewsController],
  providers: [NewsService],
})
export class NewsModule {}
