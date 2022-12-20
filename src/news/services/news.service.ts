import { Injectable } from '@nestjs/common';
import {
  CreateNewsDto,
  DeleteNewsDto,
  FindNewsDto,
  RedactNewsDto,
} from '../dto/news.dto';
import { PATH } from 'src/shared/constants';
import { InjectRepository } from '@nestjs/typeorm';
import { NewsEntity } from '../entities/news.entity';
import { Repository } from 'typeorm';
@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(NewsEntity)
    private readonly newsRepository: Repository<NewsEntity>,
  ) {}

  async getNews() {
    const response = await this.newsRepository.find();
    return response;
  }

  async getAuthorNews(authorId: number) {
    return await this.newsRepository.findBy({ authorId });
  }

  async findNews(news: FindNewsDto) {
    const response = await this.newsRepository.findOne({
      where: {
        id: news.id,
      },
      relations: ['comments'],
    });
    return response;
  }

  async addNews(news: CreateNewsDto, image: Express.Multer.File) {
    const addedNews = new NewsEntity();
    addedNews.author = news.author;
    addedNews.cover = PATH + image.filename;
    addedNews.title = news.title;
    addedNews.description = news.description;
    addedNews.authorId = news.authorId;
    await this.newsRepository.save(addedNews);
    return addedNews;
  }

  async redactNews(news: RedactNewsDto, image: Express.Multer.File) {
    const originalNews = await this.newsRepository.findOneBy({ id: news.id });
    let cover = originalNews.cover;
    if (image) cover = PATH + image.filename;
    const reworkedNews = {
      ...originalNews,
      ...news,
      cover,
    };
    await this.newsRepository.update({ id: news.id }, reworkedNews);
    return reworkedNews;
  }

  async deleteNews(news: DeleteNewsDto) {
    const deletedNews = await this.newsRepository.findOneBy({ id: news.id });
    await this.newsRepository.delete({ id: news.id });
    return deletedNews;
  }
}
