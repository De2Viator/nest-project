import { PUBLIC_KEY } from '../../constants';
import { SetMetadata } from '@nestjs/common';

export const Public = () => SetMetadata(PUBLIC_KEY, true);
