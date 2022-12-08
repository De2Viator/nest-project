import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName } from 'src/shared/helper';
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
  async getComments(@Param('newsId') newsId: number) {
    const response = await this.commentService.getComments(+newsId);
    return response;
  }

  @Post('/add/:newsId')
  @UseInterceptors(
    FileInterceptor('cover', {
      storage: diskStorage({
        destination: './static',
        filename: editFileName,
      }),
    }),
  )
  async addComment(
    @Body() comment: AddCommentDto,
    @UploadedFile() file: Express.Multer.File,
    @Param('newsId') newsId: number,
  ) {
    const response = await this.commentService.addComment(
      comment,
      file,
      +newsId,
    );
    return response;
  }

  @Delete('/remove')
  async deleteComment(@Body() comment: DeleteCommentDto) {
    const response = await this.commentService.deleteComment(comment.id);
    return response;
  }

  @Post('/nest/:commentId')
  async addNestedComment(
    @Param('commentId') commentId: number,
    @Body('text') text: string,
  ) {
    const response = await this.commentService.addNestedComment(
      commentId,
      text,
    );
    return response;
  }

  @Put('/:commentId')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './static',
        filename: editFileName,
      }),
    }),
  )
  async updateComment(
    @Param('commentId') commentId: number,
    @Body() comment: EditCommentDto,
  ) {
    const response = await this.commentService.updateComment(
      commentId,
      comment,
    );
    return response;
  }
}
