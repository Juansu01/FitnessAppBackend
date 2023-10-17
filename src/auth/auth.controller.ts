import { Controller } from '@nestjs/common';
import { Post, Body } from '@nestjs/common';

import { UserService } from 'src/user/user.service';
import { CreateUserDTO } from 'src/user/dtos/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  register(@Body() newUser: CreateUserDTO) {
    return this.userService.create(newUser);
  }
}
