import { Controller } from '@nestjs/common';
import { Post, Body } from '@nestjs/common';

import { UserService } from 'src/user/user.service';
import { CreateTraineeDTO } from 'src/user/dtos/create-trainee.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('register/trainee')
  register(@Body() newTrainee: CreateTraineeDTO) {
    return this.userService.createTrainee(newTrainee);
  }
}
