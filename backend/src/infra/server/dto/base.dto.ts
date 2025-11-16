import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class IdDto {
  /**
   * Id do usuario usado para identificar o usuario no banco de dados
   * @example 4fa44d3e-6540-4231-ac30-f7fa6a720cbb
   */

  @IsNotEmpty({ message: 'O campo ID não  pode ser vazio' })
  @IsString({ message: 'O campo ID precisa ser uma string' })
  @IsUUID('4', { message: 'O campo ID precisa ser um uuid valido' })
  id: string;
}
