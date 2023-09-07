import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from 'src/entities/user/user.entity';
import { Trainer } from 'src/entities/trainer/trainer';
import { Trainee } from 'src/entities/trainee/trainee';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  username: 'root',
  password: 'kratitos10',
  database: 'fitness-app-dev',
  entities: [User, Trainee, Trainer],
  synchronize: true,
};
