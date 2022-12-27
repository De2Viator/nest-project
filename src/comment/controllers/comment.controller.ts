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
import { Public } from '../../shared/decorators/roles/public.decorator';
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get('/:newsId')
  @Public()
  async getComments(@Param('newsId') newsId: number) {
    const response = await this.commentService.getComments(+newsId);
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
}
