import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { UserUseCase } from 'src/app/usecase/userUseCase';
import { UserCreateDto, UserEmailUpdateDto, UserLoginDto, UserNameUpdateDto, UserPasswordUpdateDto } from '../dto/user.dto';
import { IdDto } from '../dto/base.dto';

@Controller('user')
export class UserController {
  constructor(private userUseCase: UserUseCase) {}

  @Post('create')
  @HttpCode(201)
  async createUser(@Body() user: UserCreateDto) {
    await this.userUseCase.create(user);
    return [{ message: 'usuario criado com sucesso' }];
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() login: UserLoginDto) {
    await this.userUseCase.login(login);
    return [{ message: 'Login efetuado com sucesso' }];
  }

  @Get('findall')
  @HttpCode(200)
  async getAll() {
    const data = await this.userUseCase.listUsers();
    return [{ message: 'Users retornados com sucesso', result: data.map((user) => user.toJson) }];
  }

  @Get('findone/:id')
  @HttpCode(200)
  async findOneId(@Param() id: IdDto) {
    const data = await this.userUseCase.findById(id.id);
    return [{ message: 'User encontrado com sucesso', result: data.toJson }];
  }

  @Patch('nameupdate/:id')
  @HttpCode(200)
  async nameUpdate(@Param() id: IdDto, @Body() name: UserNameUpdateDto) {
    await this.userUseCase.nameUpdate({ id: id.id, name: name.name });
    return [{ message: 'Nome atualizado com sucesso' }];
  }

  @Patch('passwordupdate/:id')
  @HttpCode(200)
  async passwordUpdate(@Param() id: IdDto, @Body() data: UserPasswordUpdateDto) {
    await this.userUseCase.passwordUpdate({ id: id.id, password: data.password, newPassword: data.newPassword });
    return [{ message: 'senha atualizada com sucesso' }];
  }

  @Patch('emailupdate/:id')
  @HttpCode(200)
  async updateEmail(@Param() id: IdDto, @Body() data: UserEmailUpdateDto) {
    await this.userUseCase.emailUpdate({ id: id.id, email: data.email, password: data.password });
    return [{ message: 'email atualizado com sucesso' }];
  }

  @Delete('delete/:id')
  @HttpCode(200)
  async delete(@Param() id: IdDto) {
    await this.userUseCase.delete(id.id);
    return [{ message: 'usuario deletado com sucesso' }];
  }
}
