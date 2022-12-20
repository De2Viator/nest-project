import { Roles } from '../../user/models/user.dto';

export interface JwtUser {
  sub: number;
  email: string;
  role: Roles;
}
