import { Module } from '@nestjs/common';
import { CommentController } from '../controllers/comment.controller';
import { CommentService } from '../services/comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from '../entities/comment.entity';
import { CommentGateway } from '../../socket/comment.socket';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../../user/entities/user.entity';
import { NewsEntity } from '../../news/entities/news.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity, UserEntity, NewsEntity])],
  controllers: [CommentController],
  providers: [CommentService, CommentGateway, JwtService],
  exports: [CommentService, TypeOrmModule],
})
export class CommentModule {}
