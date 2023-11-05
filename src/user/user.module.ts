import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../entities/user/user.entity';
import { Trainee } from '../entities/trainee/trainee';
import { Trainer } from '../entities/trainer/trainer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, Trainee, Trainer])],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
