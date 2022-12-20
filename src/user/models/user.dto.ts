import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export enum Roles {
  ADMIN = 'admin',
  USER = 'user',
  MODERATOR = 'moderator',
}

export class CreateUserDto {
  @IsString() password: string;
  @IsString() lastName: string;
  @IsString() firstName: string;
  @IsString() email: string;
  @IsEnum(Roles) @IsOptional() role?: Roles;
}

export class UpdateUserDto {
  @IsString() lastName: string;
  @IsString() firstName: string;
  @IsString() email: string;
  @IsString() @IsOptional() password: string;
  @IsString() personId: string;
}

export class UserIds {
  @IsNumber() id: number;
  @IsNumber() personId: number;
}
