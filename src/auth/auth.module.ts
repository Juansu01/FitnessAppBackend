import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'users/users.module';
import { AuthProvider } from './auth.provider';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [forwardRef(() => UsersModule), ConfigModule],
  controllers: [AuthController],
  providers: [AuthService, AuthProvider],
  exports: [AuthService, AuthProvider],
})
export class AuthModule {}
