import { Controller } from '@nestjs/common';

import { UserService } from './user.service';
import { Get, Param } from '@nestjs/common';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUsers() {
    return this.userService.findAll();
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Get('trainees/:id')
  getOneTrainee(@Param('id') id: string) {
    return this.userService.findTrainee(id);
  }
}
