import { Entity, Column } from 'typeorm';

import { BaseEntity } from '../base-entity.entity';
import { UserRole } from './enums/user-role.enum';
import { UserStatus } from './enums/user-status.enum';
import { UserType } from './enums/user-type.enum';

@Entity()
export class User extends BaseEntity {
  @Column({ nullable: false })
  fullName: string;

  @Column({ nullable: false, unique: true })
  userName: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  userRole: string;

  @Column({
    nullable: false,
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.ACTIVE,
  })
  userStatus: string;

  @Column({
    nullable: false,
    type: 'enum',
    enum: UserType,
    default: UserType.TRAINEE,
  })
  userType: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false, select: false })
  password: string;
}
