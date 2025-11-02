import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';
import { BaseDto } from '../base.dto';

export class UserNameUpdateDto extends PartialType(BaseDto) {
  @ApiProperty({
    description: 'Nome completo do usuário',
    example: 'Jon Doe',
  })
  @IsNotEmpty({ message: 'O campo "Nome" não pode ser vazio' })
  @IsString({ message: 'O campo "Nome" precisa ser uma string' })
  @Length(3, 25, { message: 'O nome deve ter entre 3 e 25 caracteres' })
  name: string;
}
