import { IsNotEmpty, IsString } from 'class-validator';

export class IdDto {
  /**
   * Id do usuario usado para identificar o usuario no banco de dados
   * @example sdsdsd-sdfdf1f-1fdsfd-fdfdfd
   */

  @IsNotEmpty({ message: 'O campo ID não  pode ser vazio' })
  @IsString({ message: 'O campo ID precisa ser uma string' })
  id: string;
}
