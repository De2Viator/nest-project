import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { LocalStrategyGuard } from '../../shared/decorators/wrappers/strategies';
import { AuthService } from '../services/auth.service';
import { Public } from '../../shared/decorators/roles/public.decorator';

@Controller('auth/')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(LocalStrategyGuard)
  @Public()
  @Post('login')
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }
}
