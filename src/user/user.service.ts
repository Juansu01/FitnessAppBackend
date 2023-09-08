import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user/user.entity';
import { NotImplementedException } from '@nestjs/common';

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
}
