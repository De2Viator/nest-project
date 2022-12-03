import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateNewsDto {
  @ApiProperty() @IsString() title: string;
  @ApiProperty() @IsString() description: string;
  @ApiProperty() @IsString() author: string;
}

export class News extends CreateNewsDto {
  @ApiProperty()
  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  viewsCount?: number;
  @ApiProperty() @IsString() cover: string;

  @ApiProperty() @ApiPropertyOptional() @IsString() id: string;
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
  viewsCount?: number;

  @ApiProperty()
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  cover?: string;

  @ApiProperty() @IsString() id: string;
}
export class DeleteNewsDto {
  @ApiProperty() @IsString() id: string;
}

export class FindNewsDto extends DeleteNewsDto {}
