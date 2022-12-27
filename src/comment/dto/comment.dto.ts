import { IsNumber, IsString } from 'class-validator';

export class AddCommentDto {
  @IsString() text: string;
  @IsNumber() userId: number;
  @IsNumber() newsId: number;
}

export class Comment extends AddCommentDto {
  @IsNumber() id: number;
  @IsString() text: string;
}

export class EditCommentDto extends Comment {}

export class DeleteCommentDto {
  @IsNumber() id: number;
}

export class NestedComments {
  id: string;
  text: string;
}
