import { Injectable } from '@nestjs/common';
import { UserService } from '../../user/services/user.service';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}
  async validateUser(
    email: string,
    password: string,
  ): Promise<UserEntity | null> {
    const user = await this.userService.getUserByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) return user;
    if (user && password === user.password) return user;
    return null;
  }

  async login(user: Omit<UserEntity, 'password'>) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    console.log(payload);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
