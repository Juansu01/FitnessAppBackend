import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../entities/user/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { Trainee } from '../entities/trainee/trainee';

@Module({
  imports: [TypeOrmModule.forFeature([User, Trainee])],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
