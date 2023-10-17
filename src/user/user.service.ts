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
import { CreateUserDTO } from './dtos/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findOne(id: string): Promise<User | undefined> {
    throw new NotImplementedException();
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async create(user: CreateUserDTO): Promise<User> {
    try {
      const newUser = this.userRepository.create(user);
      await this.userRepository.save(newUser);
      return newUser;
    } catch (error) {
      if (error instanceof QueryFailedError)
        throw new BadRequestException(error.message);

      console.error(error);
      throw new InternalServerErrorException('Something went wrong!');
    }
  }
}
