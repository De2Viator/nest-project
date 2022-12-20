import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Render,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { CommentService } from 'src/comment/services/comment.service';
import { MailService } from 'src/mail/services/mail.service';
import { editFileName } from 'src/shared/helper';
import {
  CreateNewsDto,
  DeleteNewsDto,
  FindNewsDto,
  RedactNewsDto,
} from '../dto/news.dto';
import { NewsService } from '../services/news.service';
import { Public } from '../../shared/decorators/roles/public.decorator';
import { Roles } from '../../shared/decorators/roles/roles.decorator';
import { Roles as UserRoles } from '../../user/models/user.dto';

@Controller('news/')
export class NewsController {
  constructor(
    private readonly newsService: NewsService,
    private readonly commentService: CommentService,
    private readonly mailService: MailService,
  ) {}

  @Public()
  @Get('')
  @Render('all-news')
  async getAllNewsPage() {
    const allNews = await this.newsService.getNews();
    return {
      title: 'Все новости',
      news: allNews,
    };
  }

  @Public()
  @Get('/:newsId/details')
  @Render('details-news')
  async getNewsPage(@Param('newsId') newsId: number) {
    const news = await this.newsService.findNews({ id: newsId });
    const { comments } = news;
    return {
      news,
      comments,
      title: 'Новость',
    };
  }

  @Public()
  @Get('find')
  async findNews(@Query('news') news: FindNewsDto) {
    return await this.newsService.findNews(news);
  }

  @Post('add')
  @Roles(UserRoles.ADMIN)
  @UseInterceptors(
    FileInterceptor('cover', {
      storage: diskStorage({
        destination: './static',
        filename: editFileName,
      }),
    }),
  )
  async addNews(
    @Body() news: CreateNewsDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    news.authorId = +news.authorId;
    const addedNews = await this.newsService.addNews(news, file);
    await this.mailService.sendMailAboutFreshNews(
      [
        {
          name: 'Yurij',
          email: 'yurasadf2@gmail.com',
        },
      ],
      addedNews,
    );
    return addedNews;
  }

  @Roles(UserRoles.ADMIN)
  @Put('')
  @UseInterceptors(
    FileInterceptor('cover', {
      storage: diskStorage({
        destination: './static',
        filename: editFileName,
      }),
    }),
  )
  async redactNews(
    @Body() news: RedactNewsDto,
    @Res() res: Response,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const originalNews = await this.newsService.findNews(news);
    const response: Error | RedactNewsDto = await this.newsService.redactNews(
      news,
      file,
    );
    if (response instanceof Error) {
      res.status(HttpStatus.NOT_FOUND).send(response);
    } else {
      await this.mailService.sendMailAboutUpdatedNews(
        [
          {
            name: 'Yurij',
            email: 'yurasadf2@gmail.com',
          },
        ],
        originalNews,
        response,
      );
      res.status(HttpStatus.OK).send(response);
    }
  }

  @Delete('')
  @Roles(UserRoles.ADMIN)
  async deleteNews(@Body() news: DeleteNewsDto) {
    return await this.newsService.deleteNews(news);
  }

  @Public()
  @Get('author')
  async getAuthorNews(@Query('authorId') authorId: number) {
    return await this.newsService.getAuthorNews(authorId);
  }
}
