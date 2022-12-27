import {
  Body,
  Controller,
  Get,
  Post,
  Put, Query,
  Render,
  UploadedFile,
  UseInterceptors
} from "@nestjs/common";
import { CreateUserDto, UpdateUserDto, UserIds } from "../models/user.dto";
import { UserService } from '../services/user.service';
import { Public } from '../../shared/decorators/roles/public.decorator';
import { UserEntity } from '../entities/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName } from '../../shared/helper';

@Controller('user/')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Public()
  @UseInterceptors(
    FileInterceptor('cover', {
      storage: diskStorage({
        destination: './static',
        filename: editFileName,
      }),
    }),
  )
  @Post('add')
  async addUser(
    @Body() user: CreateUserDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.userService.createUser(user, file);
  }

  @Put('update')
  @UseInterceptors(
    FileInterceptor('cover', {
      storage: diskStorage({
        destination: './static',
        filename: editFileName,
      }),
    }),
  )
  async updateUser(
    @Body() user: UpdateUserDto,
    @Query() ids: UserIds,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (ids.id == ids.personId) return;
    return await this.userService.updateUser(user, file, ids.id);
  }

  @Public()
  @Get('')
  @Render('user-info')
  async getUserInfoPage(@Body('id') id: number) {
    const user = await this.userService.getUserById(id);
    return { user, action: `update?id=${user.id}&personId=${id}` };
  }

  @Public()
  @Get('registration')
  @Render('user-info')
  async registration() {
    const user = new UserEntity();
    user.firstName = '';
    user.email = '';
    user.lastName = '';
    return { user, action: 'add' };
  }
}
