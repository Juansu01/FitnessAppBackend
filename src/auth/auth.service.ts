import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { LoginDto } from './dtos/login.dto';
import { UsersService } from 'users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async createAccessToken(payload: {
    sub: string;
    firstName: string;
    lastName: string;
  }) {
    const token = await this.jwtService.signAsync(payload);

    if (typeof token !== 'string') {
      throw new HttpException(
        'Invalid token type received',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return token;
  }

  async logIn(loginDto: LoginDto) {
    const { email, password: passwordGuess } = loginDto;

    const user = await this.usersService.findOne({ where: { email } });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const match = await bcrypt.compare(passwordGuess, user.password);

    if (!match) {
      throw new UnauthorizedException();
    }

    const payload = {
      sub: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
    };
    const accessToken = await this.jwtService.signAsync(payload);

    return {
      accessToken,
    };
  }
}
