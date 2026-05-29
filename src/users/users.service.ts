import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import bcrypt from 'bcrypt';

import { User } from './users.entity';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(findOneUserOptionsWhere: FindOneOptions<User>): Promise<User | null> {
    return this.usersRepository.findOne(findOneUserOptionsWhere);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async hashPassword(plainPassword: string, saltRounds = 10) {
    try {
      const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
      return hashedPassword;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Failed to hash password',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { password: plainPassword, ...newUserData } = createUserDto;
    const saltRounds = 10;
    const hashedPassword = await this.hashPassword(plainPassword, saltRounds);

    try {
      const newUser = this.usersRepository.create({
        ...newUserData,
        password: hashedPassword,
      });

      console.log({ message: 'User created successfully', user: newUserData });

      return newUser;
    } catch (error) {
      console.error('UsersService createUser method error', error);

      throw new HttpException(
        'Error creating user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
