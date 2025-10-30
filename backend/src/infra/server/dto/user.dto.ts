import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, Length } from 'class-validator';
import { PartialType, PickType } from '@nestjs/mapped-types';
import { BaseDto } from './base.dto';

export class UserCreateDto extends PartialType(BaseDto) {
  @IsNotEmpty({ message: 'O campo Nome não  pode ser vazio' })
  @IsString({ message: 'O campo Nome precisa ser uma string' })
  @Length(3, 25, { message: 'O nome deve ter pelo menos 8 caracteres e no maximo 25' })
  name: string;

  @IsNotEmpty({ message: 'O campo Email não  pode ser vazio' })
  @IsString({ message: 'O campo Email precisa ser uma string' })
  @IsEmail({}, { message: 'O campo Email precisa ser um email valido' })
  email: string;

  @IsNotEmpty({ message: 'O campo Senha não  pode ser vazio' })
  @IsStrongPassword(
    { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 },
    { message: 'A senha deve ter no mínimo 8 caracteres com letras maiúsculas, minúsculas, números e símbolos' },
  )
  @IsString({ message: 'O campo Senha precisa ser uma string' })
  password: string;
}

export class UserPasswordUpdateDto {
  @IsNotEmpty({ message: 'O campo Senha não  pode ser vazio' })
  @IsString({ message: 'O campo Senha precisa ser uma string' })
  password: string;

  @IsNotEmpty({ message: 'O campo Senha não  pode ser vazio' })
  @IsStrongPassword(
    { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 },
    { message: 'A senha deve ter no mínimo 8 caracteres com letras maiúsculas, minúsculas, números e símbolos' },
  )
  @IsString({ message: 'O campo Senha precisa ser uma string' })
  newPassword: string;
}

//ahustebug

export class UserEmailUpdateDto extends PickType(UserCreateDto, ['email', 'password']) {}

export class UserLoginDto extends PickType(UserCreateDto, ['password', 'email']) {}

export class UserNameUpdateDto extends PickType(UserCreateDto, ['name']) {}
