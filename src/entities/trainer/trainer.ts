import { Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

import { BaseEntity } from '../base-entity.entity';
import { User } from '../user/user.entity';
import { Trainee } from '../trainee/trainee';

@Entity()
export class Trainer extends BaseEntity {
  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToMany(() => Trainee, (trainee) => trainee.trainer)
  trainees: Trainee[];
}
