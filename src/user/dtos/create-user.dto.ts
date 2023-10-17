import { IsEmail, IsNotEmpty, IsString, IsEnum } from 'class-validator';

import { UserType } from 'src/entities/user/enums/user-type.enum';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(UserType)
  userType: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
