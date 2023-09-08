import { Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

import { BaseEntity } from '../base-entity.entity';
import { User } from '../user/user.entity';
import { Trainer } from '../trainer/trainer';

@Entity()
export class Trainee extends BaseEntity {
  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Trainer, (trainer) => trainer.trainees)
  trainer: Trainer;
}
