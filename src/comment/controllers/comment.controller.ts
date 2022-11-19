import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  AddCommentDto,
  DeleteCommentDto,
  EditCommentDto,
} from '../dto/comment.dto';
import { CommentService } from '../services/comment.service';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get('/:newsId')
  async getComments(@Param('newsId') newsId: string) {
    const response = await this.commentService.getComments(newsId);
    return response;
  }

  @Post('/add')
  async addComment(@Body() comment: AddCommentDto) {
    const response = await this.commentService.addComment(comment);
    return response;
  }

  @Delete('/remove')
  async deleteComment(@Body() comment: DeleteCommentDto) {
    const response = await this.commentService.deleteComment(comment.id);
    return response;
  }

  @Post('/nest/:commentId')
  async addNestedComment(
    @Param('commentId') commentId: string,
    @Body('text') text: string,
  ) {
    const response = await this.commentService.addNestedComment(
      commentId,
      text,
    );
    return response;
  }

  @Put('/:commentId')
  async updateComment(
    @Param('commentId') commentId: string,
    @Body() comment: EditCommentDto,
  ) {
    const response = await this.commentService.updateComment(
      commentId,
      comment,
    );
    return response;
  }
}
