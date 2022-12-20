import { Module } from '@nestjs/common';
import { CommentModule } from 'src/comment/modules/comment.module';
import { MailModule } from 'src/mail/modules/mail.module';
import { NewsController } from '../controllers/news.controller';
import { NewsService } from '../services/news.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsEntity } from '../entities/news.entity';

@Module({
  imports: [CommentModule, MailModule, TypeOrmModule.forFeature([NewsEntity])],
  controllers: [NewsController],
  providers: [NewsService],
  exports: [NewsService, TypeOrmModule],
})
export class NewsModule {}
