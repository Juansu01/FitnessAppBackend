import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from 'src/entities/user/user.entity';
import { Trainer } from 'src/entities/trainer/trainer';
import { Trainee } from 'src/entities/trainee/trainee';

export const getDatabaseConfig = (): TypeOrmModuleOptions => {
  return {
    type: 'mysql',
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [User, Trainee, Trainer],
    synchronize: true,
  };
};
