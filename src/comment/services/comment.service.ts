import { Injectable } from '@nestjs/common';
import { AddCommentDto, Comment, EditCommentDto } from '../dto/comment.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CommentService {
  comments: Map<string, Comment> = new Map();

  async getComments(newsId: string): Promise<Record<string, Comment>> {
    console.log(newsId);
    const resultMap: Record<string, Comment> = {};
    this.comments.forEach((comment, id) => {
      if (comment.newsId === newsId) {
        resultMap[id] = comment;
      }
    });
    return resultMap;
  }

  async addComment(comment: AddCommentDto): Promise<Comment> {
    const addedComment: Comment = {
      id: uuidv4(),
      ...comment,
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
  ): Promise<Comment> {
    this.comments.set(commentId, comment);
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
