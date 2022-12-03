import { IsString } from 'class-validator';

export class AddCommentDto {
  @IsString() text: string;
  @IsString() author: string;
}

export class Comment extends AddCommentDto {
  @IsString() id: string;
  @IsString() cover: string;
  @IsString() newsId: string;
  nestedComments: NestedComments[];
}

export class EditCommentDto extends Comment {}

export class DeleteCommentDto {
  @IsString() id: string;
}

export class NestedComments {
  id: string;
  text: string;
}
