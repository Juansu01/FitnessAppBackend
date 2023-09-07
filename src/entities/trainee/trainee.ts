import { Entity, JoinColumn, OneToOne } from 'typeorm';

import { BaseEntity } from '../base-entity.entity';
import { User } from '../user/user.entity';

@Entity()
export class Trainee extends BaseEntity {
  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
