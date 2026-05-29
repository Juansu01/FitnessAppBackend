import {
  Controller,
  Body,
  Get,
  Post,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { AuthService } from 'auth/auth.service';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const { email } = createUserDto;

    const existingUser = await this.usersService.findOne({
      where: {
        email,
      },
    });

    if (existingUser) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const newUser = await this.usersService.create(createUserDto);

    const payload = {
      sub: newUser.id.toString(),
      firstName: newUser.firstName,
      lastName: newUser.lastName,
    };

    return this.authService.createAccessToken(payload);
  }

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }
}
