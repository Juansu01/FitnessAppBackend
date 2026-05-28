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

    try {
      const newUser = await this.usersService.create(createUserDto);
      console.log({ message: 'User created successfully', user: newUser });
    } catch (error) {
      console.error('UsersController createUser method error', error);

      throw new HttpException(
        'Error creating user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return this.authService.initiateSignUp(createUserDto);
  }

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }
}
