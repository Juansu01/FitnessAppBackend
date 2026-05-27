import { Controller, Get, Post } from '@nestjs/common';
import { AuthService } from 'auth/auth.service';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  async createUser() {
    return Promise.reject(new Error('Not implemented yet'));
  }

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }
}
