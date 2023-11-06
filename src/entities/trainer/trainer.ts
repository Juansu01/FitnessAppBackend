import { Entity, JoinColumn, OneToMany, OneToOne, Column } from 'typeorm';

import { BaseEntity } from '../base-entity.entity';
import { User } from '../user/user.entity';
import { Trainee } from '../trainee/trainee';

@Entity()
export class Trainer extends BaseEntity {
  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @Column()
  gender: string;

  @OneToMany(() => Trainee, (trainee) => trainee.trainer)
  trainees: Trainee[];
}
