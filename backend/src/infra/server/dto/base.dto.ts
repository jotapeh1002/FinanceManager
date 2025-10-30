import { IsDate, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class IdDto {
  @IsNotEmpty({ message: 'O campo ID não  pode ser vazio' })
  @IsUUID(4, { message: 'O ID deve ser um UUID válido' })
  @IsString({ message: 'O campo ID precisa ser uma string' })
  id: string;
}

export class BaseDto {
  @IsDate({ message: 'O campo CreatedAt precisa ser do tipo Date' })
  createdAt?: Date;

  @IsDate({ message: 'O campo CreatedAt precisa ser do tipo Date' })
  updatedAt?: Date;
}
