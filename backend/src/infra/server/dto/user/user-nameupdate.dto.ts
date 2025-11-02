import { IsNotEmpty, IsString, Length } from 'class-validator';

export class UserNameUpdateDto {
  /**
   * Nome do usuário nickname
   * @example "jon Doe"
   */

  @IsNotEmpty({ message: 'O campo "Nome" não pode ser vazio' })
  @IsString({ message: 'O campo "Nome" precisa ser uma string' })
  @Length(3, 25, { message: 'O nome deve ter entre 3 e 25 caracteres' })
  name: string;
}
