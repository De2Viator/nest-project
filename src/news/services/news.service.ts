import { Injectable } from '@nestjs/common';
import {
  CreateNewsDto,
  DeleteNewsDto,
  FindNewsDto,
  News,
  RedactNewsDto,
} from '../dto/news.dto';
import { v4 as uuidv4 } from 'uuid';
import { PATH } from 'src/shared/constants';

@Injectable()
export class NewsService {
  news: Map<string, News> = new Map();

  async getNews() {
    const resultMap: Record<string, News> = {};
    this.news.forEach((news, id) => {
      resultMap[id] = news;
    });

    return resultMap;
  }

  async findNews(news: FindNewsDto) {
    return this.news.get(news.id);
  }

  async addNews(news: CreateNewsDto, image: Express.Multer.File) {
    const addedNews: News = {
      cover: PATH + image.filename,
      id: uuidv4(),
      ...news,
    };
    this.news.set(addedNews.id, addedNews);
    return addedNews;
  }

  async redactNews(news: RedactNewsDto, image: Express.Multer.File) {
    const originalNews = this.news.get(news.id);
    let cover = originalNews.cover;
    if (image) cover = PATH + image.filename;
    const reworkedNews: News = {
      ...originalNews,
      ...news,
      cover,
    };
    this.news.set(news.id, reworkedNews);
    return reworkedNews;
  }

  async deleteNews(news: DeleteNewsDto) {
    const deletedNews = JSON.parse(JSON.stringify(this.news.get(news.id)));
    this.news.delete(news.id);
    return deletedNews;
  }
}
