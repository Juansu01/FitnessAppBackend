import { Entity, JoinColumn, ManyToOne, OneToOne, Column } from 'typeorm';

import { BaseEntity } from '../base-entity.entity';
import { User } from '../user/user.entity';
import { Trainer } from '../trainer/trainer';
import { TraineeLevel } from './enums/trainee-level.enum';

@Entity()
export class Trainee extends BaseEntity {
  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @Column()
  gender: string;

  @Column({
    type: 'decimal',
    precision: 5,
    scale: 2,
  })
  weight: number;

  @Column({
    type: 'enum',
    enum: TraineeLevel,
    default: TraineeLevel.BEGINNER,
  })
  level: string;

  @ManyToOne(() => Trainer, (trainer) => trainer.trainees)
  trainer: Trainer;
}
