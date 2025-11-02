import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class IdDto {
  @ApiProperty({
    description: 'Id "uuid" do usuario usado para consutas',
    example: 'ddssd-ssds7sd-5sd5ds-5s54dss',
  })
  @IsNotEmpty({ message: 'O campo ID não  pode ser vazio' })
  @IsString({ message: 'O campo ID precisa ser uma string' })
  id: string;
}

export class BaseDto {
  @IsDate({ message: 'O campo CreatedAt precisa ser do tipo Date' })
  createdAt?: Date;

  @IsDate({ message: 'O campo CreatedAt precisa ser do tipo Date' })
  updatedAt?: Date;
}
