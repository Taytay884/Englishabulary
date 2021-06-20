import { SetMetadata } from '@nestjs/common';

export const jwtConstants = {
  secret: 'SecretKey',
};

export const IS_PUBLIC_KEY = 'isPublic';
export const SkipJwtAuth = () => SetMetadata(IS_PUBLIC_KEY, true);
export const JWT_PRIVATE_KEY = 'jwtPrivateKey';
export const JWT_PUBLIC_KEY = 'jwtPublicKey';
