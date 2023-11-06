import { Controller } from '@nestjs/common';
import { Post, Body } from '@nestjs/common';

import { UserService } from 'src/user/user.service';
import { CreateTraineeDTO } from 'src/user/dtos/create-trainee.dto';
import { CreateTrainerDTO } from 'src/user/dtos/create-trainer.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('register/trainee')
  registerTrainee(@Body() newTrainee: CreateTraineeDTO) {
    return this.userService.createTrainee(newTrainee);
  }

  @Post('register/trainer')
  registerTrainer(@Body() newTrainer: CreateTrainerDTO) {
    return this.userService.createTrainee(newTrainer);
  }
}
