import { Controller, HttpCode, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SessionNewAcessToken } from 'src/app/usecase/session';
import { SessionFindAllByUserId } from 'src/app/usecase/session/session-findAllByUserId';
import { IdDto } from '../dto/base.dto';
import { JwtGuard } from '../auth/jwt.guard';
import type { Request, Response } from 'express';
import { PayloadInput } from 'src/app/interfaces/iTokenProviders';
import { SessionRevoked } from 'src/app/usecase/session/sesssion-revoked';

interface RequestWithUser extends Request {
  user: PayloadInput;
  cookies: Record<string, string>;
}

@ApiTags('Autenticação')
@Controller('auth')
export class SessionController {
  constructor(
    private readonly newAcessToken: SessionNewAcessToken,
    private readonly findByUserId: SessionFindAllByUserId,
    private readonly revokedToken: SessionRevoked,
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

  @Post('refresh')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Atualizar token de acesso',
    description: 'Gera um novo token de acesso usando um refresh token válido',
  })
  async refreshAccessToken(@Res({ passthrough: true }) res: Response, @Req() req: RequestWithUser) {
    const refreshToken = req.cookies['refresh_token'];
    const result = await this.newAcessToken.exec({ refreshToken });

    this.createCookie(res, refreshToken);

    return {
      mensage: '',
      data: {
        acessToken: result.accessToken,
      },
    };
  }

  @Post('sessions')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @HttpCode(200)
  @ApiOperation({
    summary: 'Obter sessões do usuário',
    description: 'Recupera todas as sessões ativas do usuário autenticado',
  })
  async getUserSessions(@Req() req: RequestWithUser) {
    const userId = req.user.userId;
    const sessions = await this.findByUserId.exec(userId);

    return {
      mensage: 'Sessões encontradas',
      data: sessions,
    };
  }

  @Post('sessions/:id/revoke')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @HttpCode(200)
  @ApiOperation({
    summary: 'Revogar sessão',
    description: 'Revoga uma sessão específica pelo ID',
  })
  async revokeSession(@Param() idDto: IdDto) {
    await this.revokedToken.exec(idDto.id);

    return {
      mensage: 'Logout de sessão execultado com sucesso',
    };
  }
}
