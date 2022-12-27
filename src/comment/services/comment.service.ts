import { Injectable } from '@nestjs/common';
import { AddCommentDto, EditCommentDto } from '../dto/comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentEntity } from '../entities/comment.entity';
import { NewsEntity } from '../../news/entities/news.entity';
import { UserEntity } from '../../user/entities/user.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentsRepository: Repository<CommentEntity>,
    @InjectRepository(NewsEntity)
    private readonly newsRepository: Repository<NewsEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getComments(newsId: number): Promise<CommentEntity[]> {
    const response = await this.commentsRepository.findBy({ newsId });
    return response;
  }

  async addComment(
    comment: AddCommentDto,
    newsId: number,
  ): Promise<CommentEntity> {
    const addedComment = new CommentEntity();
    addedComment.comment = comment.text;
    addedComment.newsId = newsId;
    addedComment.userId = comment.userId;
    addedComment.news = await this.newsRepository.findOneBy({
      id: comment.newsId,
    });
    addedComment.user = await this.userRepository.findOneBy({
      id: comment.userId,
    });
    await this.commentsRepository.save(addedComment);
    return addedComment;
  }

  async deleteComment(commentId: number): Promise<CommentEntity> {
    const deletedComment = await this.commentsRepository.findOneBy({
      id: commentId,
    });
    await this.commentsRepository.delete({ id: commentId });
    return deletedComment;
  }

  async updateComment(commentId: number, comment: EditCommentDto) {
    await this.commentsRepository.update(
      { id: commentId },
      {
        comment: comment.text,
      },
    );
    return await this.commentsRepository.findOneBy({ id: commentId });
  }

  async addNestedComment(commentId: number, text: string) {}
}
