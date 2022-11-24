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
import { Request } from 'express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import {
  AddCommentDto,
  DeleteCommentDto,
  EditCommentDto,
} from '../dto/comment.dto';
import { CommentService } from '../services/comment.service';

const editFileName = (
  req: Request,
  file: Express.Multer.File,
  callback: (error: Error | null, name: string) => void,
) => {
  const fileExtName = extname(file.originalname);
  const testExt = /(jpe?g)|(gif)|(png)/;
  if (!testExt.test(fileExtName)) {
    throw new Error('file is not valid');
  }
  const randomName = Array(16)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${randomName}${fileExtName}`);
};

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get('/:newsId')
  async getComments(@Param('newsId') newsId: string) {
    const response = await this.commentService.getComments(newsId);
    return response;
  }

  @Post('/add')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './static',
        filename: editFileName,
      }),
    }),
  )
  async addComment(
    @Body() comment: AddCommentDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const response = await this.commentService.addComment(comment, file);
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
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './static',
        filename: editFileName,
      }),
    }),
  )
  async updateComment(
    @Param('commentId') commentId: string,
    @Body() comment: EditCommentDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const response = await this.commentService.updateComment(
      commentId,
      comment,
      file,
    );
    return response;
  }
}
