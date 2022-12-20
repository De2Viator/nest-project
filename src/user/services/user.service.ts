import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, Roles, UpdateUserDto } from '../models/user.dto';
import { PATH } from '../../shared/constants';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async getUserByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }

  async createUser(user: CreateUserDto, image: Express.Multer.File) {
    const addedUser = new UserEntity();
    if (!addedUser.role) user.role = Roles.USER;
    user.password = await bcrypt.hash(user.password, 10);
    if (image) {
      addedUser.image = PATH + image.filename;
    }
    await this.userRepository.save(user);
    delete user.password;
    return user;
  }

  async updateUser(
    user: UpdateUserDto,
    image: Express.Multer.File,
    id: number,
  ) {
    const updatedUser = new UserEntity();
    if (image) {
      updatedUser.image = PATH + image.filename;
    }
    await this.userRepository.update(
      { id },
      {
        email: user.email,
        lastName: user.lastName,
        firstName: user.firstName,
        image: updatedUser.image,
      },
    );
    return user;
  }

  async getUserById(id: number) {
    return await this.userRepository.findOneBy({ id });
  }
}
