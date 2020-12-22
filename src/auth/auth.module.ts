import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    })
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
