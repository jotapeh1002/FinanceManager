import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { IdDto } from '../dto/base.dto';
import { UserCreateDto, UserEmailUpdateDto, UserLoginDto, UserNameUpdateDto, UserPasswordUpdateDto } from '../dto/user';
import { ApiTags } from '@nestjs/swagger';
import { UserCreate, UserDelete, UserEmailUpdate, UserList, UserLogin, UserNameUpdate, UserPasswordUpdate, UserfindById } from 'src/app/usecase/user';

@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(
    private readonly userCreate: UserCreate,
    private readonly userLogin: UserLogin,
    private readonly userFindById: UserfindById,
    private readonly userlist: UserList,
    private readonly userNameUpdate: UserNameUpdate,
    private readonly userEmailUpdate: UserEmailUpdate,
    private readonly userPasswordUpdate: UserPasswordUpdate,
    private readonly userDelete: UserDelete,
  ) {}

  @Post()
  @HttpCode(201)
  async create(@Body() userCreateDto: UserCreateDto) {
    await this.userCreate.exec(userCreateDto);
    return { message: 'Usuário criado com sucesso' };
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() userLoginDto: UserLoginDto) {
    await this.userLogin.exec(userLoginDto);
    return { message: 'Login efetuado com sucesso' };
  }

  @Get()
  @HttpCode(200)
  async findAll() {
    const users = await this.userlist.exec();
    return { message: 'Usuários retornados com sucesso', result: users.map((u) => u.toJSON()) };
  }

  @Get(':id')
  @HttpCode(200)
  async findOne(@Param() idDto: IdDto) {
    const user = await this.userFindById.exec(idDto.id);
    return { message: 'Usuário encontrado com sucesso', result: user.toJSON() };
  }

  @Patch(':id/name')
  @HttpCode(200)
  async updateName(@Param() idDto: IdDto, @Body() nameDto: UserNameUpdateDto) {
    await this.userNameUpdate.exec({ id: idDto.id, name: nameDto.name });
    return { message: 'Nome atualizado com sucesso' };
  }

  @Patch(':id/password')
  @HttpCode(200)
  async updatePassword(@Param() idDto: IdDto, @Body() passwordDto: UserPasswordUpdateDto) {
    await this.userPasswordUpdate.exec({
      id: idDto.id,
      password: passwordDto.password,
      newPassword: passwordDto.newPassword,
    });
    return { message: 'Senha atualizada com sucesso' };
  }

  @Patch(':id/email')
  @HttpCode(200)
  async updateEmail(@Param() idDto: IdDto, @Body() emailDto: UserEmailUpdateDto) {
    await this.userEmailUpdate.exec({
      id: idDto.id,
      email: emailDto.email,
      password: emailDto.password,
    });
    return { message: 'Email atualizado com sucesso' };
  }

  @Delete(':id')
  @HttpCode(200)
  async remove(@Param() idDto: IdDto) {
    await this.userDelete.exec(idDto.id);
    return { message: 'Usuário deletado com sucesso' };
  }
}
