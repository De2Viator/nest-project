import { Injectable } from '@nestjs/common';
import {
  CreateNewsDto,
  DeleteNewsDto,
  FindNewsDto,
  News,
  RedactNewsDto,
} from '../dto/news.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class NewsService {
  news: News[] = [];

  async getNews() {
    return this.news;
  }

  async findNews(news: FindNewsDto) {
    return this.news.find((allNews) => allNews.id === news.id);
  }

  async addNews(news: CreateNewsDto) {
    const addedNews = {
      id: uuidv4(),
      ...news,
    };

    this.news.push(addedNews);
    return addedNews;
  }

  async redactNews(news: RedactNewsDto) {
    const findedIndex = this.news.findIndex(
      (allNews) => allNews.id === news.id,
    );
    news[findedIndex] = news;
    return news;
  }

  async deleteNews(news: DeleteNewsDto) {
    const findedIndex = this.news.findIndex(
      (allNews) => allNews.id === news.id,
    );
    const deletedNews = this.news.splice(findedIndex, 1);
    return deletedNews;
  }
}
