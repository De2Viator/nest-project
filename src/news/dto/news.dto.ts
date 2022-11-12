import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class News {
  @ApiProperty()
  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  viewsCount?: number;

  @ApiProperty() @IsString() title: string;
  @ApiProperty() @IsString() description: string;
  @ApiProperty() @IsString() author: string;
  @ApiProperty() @ApiPropertyOptional() @IsString() @IsOptional() id?: string;
}

export class CreateNewsDto {
  @ApiProperty() @IsString() title: string;
  @ApiProperty() @IsString() description: string;
  @ApiProperty() @IsString() author: string;
}

export class RedactNewsDto extends News {}

export class DeleteNewsDto {
  @ApiProperty() @IsString() id: string;
}

export class FindNewsDto extends DeleteNewsDto {}
