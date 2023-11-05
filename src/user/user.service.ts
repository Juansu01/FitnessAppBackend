import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  NotImplementedException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

import { User } from '../entities/user/user.entity';
import { Trainee } from '../entities/trainee/trainee';
import { CreateUserDTO } from './dtos/create-user.dto';
import { CreateTraineeDTO } from './dtos/create-trainee.dto';
import { UserType } from 'src/entities/user/enums/user-type.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Trainee)
    private traineeRepository: Repository<Trainee>,
  ) {}

  async findOne(id: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find({});
  }

  async createTrainee(user: CreateTraineeDTO): Promise<User> {
    const newUser = this.userRepository.create({
      ...user,
      userType: UserType.TRAINEE,
    });
    const newTrainee = this.traineeRepository.create();

    newTrainee.user = newUser;

    await this.userRepository.save(newUser);
    await this.traineeRepository.save(newTrainee);

    return newUser;
  }

  async findTrainee(id: string): Promise<Trainee | null> {
    const trainee = await this.traineeRepository.findOne({
      where: {
        user: {
          id,
        },
      },
      relations: {
        trainer: true,
      },
    });

    return trainee;
  }
}
