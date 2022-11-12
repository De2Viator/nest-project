import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import {
  CreateNewsDto,
  DeleteNewsDto,
  FindNewsDto,
  RedactNewsDto,
} from '../dto/news.dto';
import { NewsService } from '../services/news.service';

@Controller('news/')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get('')
  async getNews(@Res() res: Response) {
    res.status(HttpStatus.OK).send(await this.newsService.getNews());
  }

  @Get('find')
  async findNews(@Body() news: FindNewsDto) {
    return await this.newsService.findNews(news);
  }

  @Post('add')
  async addNews(@Body() news: CreateNewsDto) {
    return await this.newsService.addNews(news);
  }

  @Post('')
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
