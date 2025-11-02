import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserLoginDto {
  /**
   * Email do usuário, usado no login
   * @example jondoe@email.com
   */

  @IsNotEmpty({ message: 'O campo "Email" não pode ser vazio' })
  @IsString({ message: 'O campo "Email" precisa ser uma string' })
  @IsEmail({}, { message: 'O campo "Email" precisa ser um email válido' })
  email: string;

  /**
   * Senha do usuário usada no login
   * @example Ex@mplePa22word
   */

  @IsNotEmpty({ message: 'O campo "Senha atual" não pode ser vazio' })
  @IsString({ message: 'O campo "Senha atual" precisa ser uma string' })
  password: string;
}
