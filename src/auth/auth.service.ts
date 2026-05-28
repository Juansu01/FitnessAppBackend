import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthProvider } from './auth.provider';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { ConfigService } from '@nestjs/config';

import { LoginDto } from './dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private authProvider: AuthProvider,
    private configService: ConfigService,
  ) {}

  async initiateSignUp(createUserDto: CreateUserDto) {
    const { email, firstName, lastName } = createUserDto;

    try {
      await this.authProvider.authenticationClient.passwordless.sendEmail({
        email,
        send: 'code',
      });

      return {
        message: 'Verification code sent successfully',
        user: { email, name: `${firstName} ${lastName}` },
      };
    } catch (error) {
      console.error(`Failed to initiate sign up: ${error}`);

      throw new HttpException(
        'Failed to initiate sign up',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async completeLogin(loginDto: LoginDto) {
    const { email, otp } = loginDto;

    try {
      const tokens =
        await this.authProvider.authenticationClient.passwordless.loginWithEmail(
          {
            email,
            code: otp,
            audience: this.configService.getOrThrow('AUTH0_AUDIENCE'),
            scope: 'openid profile email',
          },
        );

      return tokens;
    } catch (error) {
      console.error(error);

      throw new HttpException(
        'Could not complete login',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
