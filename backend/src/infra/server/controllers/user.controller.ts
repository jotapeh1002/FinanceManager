import { UserSignIn, UserDelete, UserEmailUpdate, UserList, UserSignUp, UserNameUpdate, UserPasswordUpdate, UserfindById } from 'src/app/usecase/user';
import { UserCreateDto, UserEmailUpdateDto, UserLoginDto, UserNameUpdateDto, UserPasswordUpdateDto } from '../dto/user';
import { Body, Controller, Delete, Get, HttpCode, Patch, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import type { Response } from 'express';
import { JwtGuard } from '../auth/jwt.guard';
import { PayloadInput } from 'src/app/interfaces/iTokenProviders';

interface RequestWithUser extends Request {
  user: PayloadInput;
}

@ApiTags('Usuários')
@Controller('users')
export class UserController {
  constructor(
    private readonly userPasswordUpdate: UserPasswordUpdate,
    private readonly userEmailUpdate: UserEmailUpdate,
    private readonly userNameUpdate: UserNameUpdate,
    private readonly userFindById: UserfindById,
    private readonly userDelete: UserDelete,
    private readonly userCreate: UserSignUp,
    private readonly userLogin: UserSignIn,
    private readonly userlist: UserList,
  ) {}

  private createCookie(@Res({ passthrough: true }) res: Response, token: string) {
    res.cookie('refresh_token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/',
    });
  }

  @Post()
  @HttpCode(201)
  @ApiOperation({
    summary: 'Criar usuário',
    description: 'Cria um novo usuário e retorna tokens de autenticação',
  })
  async create(@Body() { email, name, password }: UserCreateDto, @Res({ passthrough: true }) res: Response) {
    const result = await this.userCreate.exec({ email: email, name: name, password: password });

    this.createCookie(res, result.refreshToken);

    return {
      message: 'Usuário criado com sucesso',
      data: {
        accessToken: result.accessToken,
      },
    };
  }

  @Post('login')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Login do usuário',
    description: 'Autentica o usuário e retorna tokens de acesso',
  })
  async login(@Body() { email, password }: UserLoginDto, @Res({ passthrough: true }) res: Response) {
    const result = await this.userLogin.exec({ email: email, password: password });

    this.createCookie(res, result.refreshToken);

    return {
      message: 'Usuário logado com sucesso',
      result: {
        accessToken: result.accessToken,
      },
    };
  }

  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @HttpCode(200)
  @Get()
  @ApiOperation({
    summary: 'Listar todos os usuários',
    description: 'Retorna todos os usuários do sistema (requer autenticação)',
  })
  async findAll() {
    const users = await this.userlist.exec();

    return {
      message: 'Usuários retornados com sucesso',
      result: users.map((u) => u.toJSON()),
    };
  }

  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @HttpCode(200)
  @Get('me')
  @ApiOperation({
    summary: 'Obter usuário atual',
    description: 'Retorna os dados do usuário autenticado',
  })
  async findOne(@Req() req: RequestWithUser) {
    const userId = req.user.userId;
    const user = await this.userFindById.exec(userId);

    return {
      message: 'Usuário encontrado com sucesso',
      result: user.toJSON(),
    };
  }

  @UseGuards(JwtGuard)
  @Patch('name')
  @ApiBearerAuth()
  @HttpCode(200)
  @ApiOperation({
    summary: 'Atualizar nome',
    description: 'Atualiza o nome do usuário autenticado',
  })
  async updateName(@Req() req: RequestWithUser, @Body() nameDto: UserNameUpdateDto) {
    const userId = req.user.userId;

    await this.userNameUpdate.exec({
      id: userId,
      name: nameDto.name,
    });

    return {
      message: 'Nome atualizado com sucesso',
    };
  }

  @UseGuards(JwtGuard)
  @Patch('password')
  @ApiBearerAuth()
  @HttpCode(200)
  @ApiOperation({
    summary: 'Atualizar senha',
    description: 'Atualiza a senha do usuário autenticado',
  })
  async updatePassword(@Req() req: RequestWithUser, @Body() passwordDto: UserPasswordUpdateDto) {
    const userId = req.user.userId;

    await this.userPasswordUpdate.exec({
      id: userId,
      password: passwordDto.password,
      newPassword: passwordDto.newPassword,
    });

    return {
      message: 'Senha atualizada com sucesso',
    };
  }

  @UseGuards(JwtGuard)
  @Patch('email')
  @ApiBearerAuth()
  @HttpCode(200)
  @ApiOperation({
    summary: 'Atualizar email',
    description: 'Atualiza o email do usuário autenticado',
  })
  async updateEmail(@Req() req: RequestWithUser, @Body() emailDto: UserEmailUpdateDto) {
    const userId = req.user.userId;

    await this.userEmailUpdate.exec({
      id: userId,
      email: emailDto.email,
      password: emailDto.password,
    });

    return {
      message: 'Email atualizado com sucesso',
    };
  }

  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @HttpCode(200)
  @Delete()
  @ApiOperation({
    summary: 'Deletar conta',
    description: 'Deleta permanentemente a conta do usuário autenticado',
  })
  async remove(@Req() req: RequestWithUser) {
    const userId = req.user.userId;
    await this.userDelete.exec(userId);

    return {
      message: 'Usuário deletado com sucesso',
    };
  }
}
