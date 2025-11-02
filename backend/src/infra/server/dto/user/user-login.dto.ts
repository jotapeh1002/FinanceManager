import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { BaseDto } from '../base.dto';

export class UserLoginDto extends PartialType(BaseDto) {
  @ApiProperty({
    description: 'Email do usuário, usado para login',
    example: 'jondoe@email.com',
  })
  @IsNotEmpty({ message: 'O campo "Email" não pode ser vazio' })
  @IsString({ message: 'O campo "Email" precisa ser uma string' })
  @IsEmail({}, { message: 'O campo "Email" precisa ser um email válido' })
  email: string;

  @ApiProperty({
    description: 'Senha atual do usuário utilizada para login',
    example: 'Ex@mplePa22sword',
  })
  @IsNotEmpty({ message: 'O campo "Senha atual" não pode ser vazio' })
  @IsString({ message: 'O campo "Senha atual" precisa ser uma string' })
  password: string;
}
