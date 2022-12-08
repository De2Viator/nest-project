import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateNewsDto {
  @ApiProperty() @ApiPropertyOptional() @IsOptional() @IsString() title: string;
  @ApiProperty()
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty() @IsString() author: string;
  @ApiProperty() @IsString() authorId: number;
}

export class News extends CreateNewsDto {
  @ApiProperty()
  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  views?: number;
  @ApiProperty() @ApiPropertyOptional() @IsString() @IsOptional() cover: string;

  @ApiProperty() @IsNumber() id: number;
}

export class RedactNewsDto {
  @ApiProperty()
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty()
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty()
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  author?: string;

  @ApiProperty()
  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  views?: number;

  @ApiProperty()
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  cover?: string;

  @ApiProperty() @IsString() id: number;
}
export class DeleteNewsDto {
  @ApiProperty() @IsNumber() id: number;
}

export class FindNewsDto extends DeleteNewsDto {}
