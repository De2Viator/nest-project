import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NewsModule } from './news/modules/news.module';
import { CalculatorModule } from './calculator/modules/calculator.module';
import { CommentModule } from './comment/modules/comment.module';

@Module({
  imports: [NewsModule, CalculatorModule, CommentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
