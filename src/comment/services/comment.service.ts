import { Injectable } from '@nestjs/common';
import { AddCommentDto, Comment, EditCommentDto } from '../dto/comment.dto';
import { v4 as uuidv4 } from 'uuid';
import { PATH } from 'src/shared/constants';

@Injectable()
export class CommentService {
  comments: Map<string, Comment> = new Map();

  async getComments(newsId: string): Promise<Record<string, Comment>> {
    const resultMap: Record<string, Comment> = {};
    this.comments.forEach((comment, id) => {
      if (comment.newsId === newsId) {
        resultMap[id] = comment;
      }
    });
    return resultMap;
  }

  async addComment(
    comment: AddCommentDto,
    image: Express.Multer.File,
    newsId: string,
  ): Promise<Comment> {
    const addedComment: Comment = {
      id: uuidv4(),
      newsId,
      ...comment,
      cover: PATH + image.filename,
      nestedComments: [],
    };
    this.comments.set(addedComment.id, addedComment);
    return addedComment;
  }

  async deleteComment(commentId: string): Promise<Comment> {
    const deletedComment = JSON.parse(
      JSON.stringify(this.comments.get(commentId)),
    );
    this.comments.delete(commentId);
    return deletedComment;
  }

  async updateComment(
    commentId: string,
    comment: EditCommentDto,
    image: Express.Multer.File,
  ): Promise<Comment> {
    this.comments.set(commentId, { ...comment, cover: PATH + image.filename });
    return this.comments.get(commentId);
  }

  async addNestedComment(commentId: string, text: string) {
    const comment = this.comments.get(commentId);
    comment.nestedComments.push({
      text,
      id: uuidv4(),
    });
  }
}
