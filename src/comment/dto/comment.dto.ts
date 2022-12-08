import { IsNumber, IsString } from 'class-validator';

export class AddCommentDto {
  @IsString() text: string;
  @IsString() author: string;
  @IsString() userId: string;
}

export class Comment extends AddCommentDto {
  @IsNumber() id: number;
  @IsString() cover: string;
  @IsString() text: string;
  @IsString() author: string;
  @IsNumber() userId: string;
}

export class EditCommentDto extends AddCommentDto {}

export class DeleteCommentDto {
  @IsNumber() id: number;
}

export class NestedComments {
  id: string;
  text: string;
}
