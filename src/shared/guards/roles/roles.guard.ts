import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { JwtUser } from '../../../auth/models/user';
import { Roles } from '../../../user/models/user.dto';
import { PUBLIC_KEY } from '../../constants';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    ) as unknown as Roles[];
    const isPublic = this.reflector.get(PUBLIC_KEY, context.getHandler());

    if (!roles || isPublic) return true;

    const req = context.switchToHttp().getRequest();
    const token = req.headers.authorization;
    if (!token) throw new UnauthorizedException();
    const user = this.jwtService.decode(token.split(' ')[1]) as JwtUser;
    console.log(user)
    if (roles.some((role) => role === user.role)) return true;
    return false;
  }
}
