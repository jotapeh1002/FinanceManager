import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, Length } from 'class-validator';

export class UserCreateDto {
  /**
   * Nome do usuário nickname
   * @example "jon Doe"
   */

  @IsNotEmpty({ message: 'O campo "Nome" não pode ser vazio' })
  @IsString({ message: 'O campo "Nome" precisa ser uma string' })
  @Length(3, 25, { message: 'O nome deve ter entre 3 e 25 caracteres' })
  name: string;

  /**
   * Email do usuário, usado para login
   * @example jondoe@email.com
   */

  @IsNotEmpty({ message: 'O campo "Email" não pode ser vazio' })
  @IsString({ message: 'O campo "Email" precisa ser uma string' })
  @IsEmail({}, { message: 'O campo "Email" precisa ser um email válido' })
  email: string;

  /**
   * Senha do usuário usada para login. Deve conter no mínimo 8 caracteres, incluindo letras maiúsculas, minúsculas, números e símbolos
   * @example Ex@mplePa22word
   */

  @IsNotEmpty({ message: 'O campo "Senha" não pode ser vazio' })
  @IsString({ message: 'O campo "Senha" precisa ser uma string' })
  @IsStrongPassword(
    { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 },
    { message: 'A senha deve ter no mínimo 8 caracteres, com letras maiúsculas, minúsculas, números e símbolos' },
  )
  password: string;
}
