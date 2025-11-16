import { IsNotEmpty, IsString } from 'class-validator';

export class TokenDto {
  /**
   * refresh token do usuario usado para identificar a sessão no banco de dados
   * @example eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
   */

  @IsNotEmpty({ message: 'O campo Token não  pode ser vazio' })
  @IsString({ message: 'O campo Token precisa ser uma string' })
  token: string;
}
