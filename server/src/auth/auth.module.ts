import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { ConfigService } from '../config/config.service';
import { ConfigModule } from '../config/config.module';
import { JWT_PRIVATE_KEY, JWT_PUBLIC_KEY } from './constants';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          privateKey: configService.get(JWT_PRIVATE_KEY),
          publicKey: configService.get(JWT_PUBLIC_KEY),
          signOptions: {
            expiresIn: '60m',
            issuer: 'AuthService',
            algorithm: 'RS256',
          },
        };
      },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, ConfigService],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
