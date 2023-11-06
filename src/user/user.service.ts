import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../entities/user/user.entity';
import { Trainee } from '../entities/trainee/trainee';
import { Trainer } from '../entities/trainer/trainer';
import { CreateTraineeDTO } from './dtos/create-trainee.dto';
import { CreateTrainerDTO } from './dtos/create-trainer.dto';
import { UserType } from 'src/entities/user/enums/user-type.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Trainee)
    private traineeRepository: Repository<Trainee>,
    @InjectRepository(Trainer)
    private trainerRepository: Repository<Trainer>,
  ) {}

  async findOne(id: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find({});
  }

  async createTrainee(user: CreateTrainerDTO): Promise<User> {
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

  async createTrainer(user: CreateTraineeDTO): Promise<User> {
    const newUser = this.userRepository.create({
      ...user,
      userType: UserType.TRAINER,
    });
    const newTrainer = this.traineeRepository.create();

    newTrainer.user = newUser;

    await this.userRepository.save(newUser);
    await this.trainerRepository.save(newTrainer);

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

  async findTrainer(id: string): Promise<Trainer | null> {
    const trainer = await this.trainerRepository.findOne({
      where: {
        user: {
          id,
        },
      },
      relations: {
        trainees: true,
      },
    });

    return trainer;
  }
}
