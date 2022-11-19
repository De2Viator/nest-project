import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { Comment } from 'src/comment/dto/comment.dto';
import { CommentService } from 'src/comment/services/comment.service';
import { renderPage } from 'src/view/main';
import { renderAllNews } from 'src/view/news/all-news';
import { renderDetailedNews } from 'src/view/news/news-detail';
import {
  CreateNewsDto,
  DeleteNewsDto,
  FindNewsDto,
  News,
  RedactNewsDto,
} from '../dto/news.dto';
import { NewsService } from '../services/news.service';

@Controller('news/')
export class NewsController {
  constructor(
    private readonly newsService: NewsService,
    private readonly commentService: CommentService,
  ) {}

  @Get('')
  async getNews(@Res() res: Response) {
    res.status(HttpStatus.OK).send(await this.newsService.getNews());
  }

  @Get('view')
  async getAllNewsPage() {
    const allNews = await this.newsService.getNews();

    const renderedNews: News[] = [];
    for (const news in allNews) {
      renderedNews.push({ ...allNews[news], id: news });
    }

    return renderPage(renderAllNews(renderedNews));
  }

  @Get('/:newsId/details')
  async getNewsPage(@Param('newsId') newsId: string) {
    const news = await this.newsService.findNews({ id: newsId });
    const newsComments = await this.commentService.getComments(newsId);
    const comments: Comment[] = [];

    for (const id in newsComments) {
      comments.push({ ...newsComments[id], id });
    }

    return renderPage(renderDetailedNews(news, comments));
  }

  @Get('find')
  async findNews(@Body() news: FindNewsDto) {
    return await this.newsService.findNews(news);
  }

  @Post('add')
  async addNews(@Body() news: CreateNewsDto) {
    return await this.newsService.addNews(news);
  }

  @Put('')
  async redactNews(@Body() news: RedactNewsDto, @Res() res: Response) {
    const response: Error | RedactNewsDto = await this.newsService.redactNews(
      news,
    );
    if (response instanceof Error) {
      res.status(HttpStatus.NOT_FOUND).send(response);
    } else {
      res.status(HttpStatus.OK).send(response);
    }
  }

  @Delete('')
  async deleteNews(@Body() news: DeleteNewsDto) {
    return await this.newsService.deleteNews(news);
  }
}
