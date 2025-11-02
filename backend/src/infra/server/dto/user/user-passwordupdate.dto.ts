import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class UserPasswordUpdateDto {
  /**
   * Nome do usuário nickname
   * @example "jon Doe"
   */

  @IsNotEmpty({ message: 'O campo "Senha atual" não pode ser vazio' })
  @IsString({ message: 'O campo "Senha atual" precisa ser uma string' })
  password: string;

  /**
   * Senha do usuário usada para login. Deve conter no mínimo 8 caracteres, incluindo letras maiúsculas, minúsculas, números e símbolos
   * @example Ex@mplePa22word
   */

  @IsNotEmpty({ message: 'O campo "Nova senha" não pode ser vazio' })
  @IsString({ message: 'O campo "Nova senha" precisa ser uma string' })
  @IsStrongPassword(
    { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 },
    { message: 'A nova senha deve ter no mínimo 8 caracteres com letras maiúsculas, minúsculas, números e símbolos' },
  )
  newPassword: string;
}
