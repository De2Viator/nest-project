import { Injectable } from '@nestjs/common';
import { AddCommentDto, Comment, EditCommentDto } from '../dto/comment.dto';
import { PATH } from 'src/shared/constants';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentEntity } from '../entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentsRepository: Repository<CommentEntity>,
  ) {}

  async getComments(newsId: number): Promise<CommentEntity[]> {
    const response = await this.commentsRepository.findBy({ newsId });
    return response;
  }

  async addComment(
    comment: AddCommentDto,
    image: Express.Multer.File,
    newsId: number,
  ): Promise<CommentEntity> {
    const addedComment = new CommentEntity();
    addedComment.comment = comment.text;
    addedComment.newsId = newsId;
    addedComment.author = comment.author;
    addedComment.userId = +comment.userId;
    addedComment.comment = comment.text;
    addedComment.cover = PATH + image.filename;
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
