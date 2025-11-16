import { HttpException, HttpStatus, Logger } from '@nestjs/common';

export class UserNotFound extends HttpException {
  constructor() {
    super(
      {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Usuario não encontrado',
        code: 'USER_NOT_FOUND',
      },
      HttpStatus.NOT_FOUND,
    );
  }
}

export class UsersNotFound extends HttpException {
  constructor() {
    super(
      {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Usuarios não encontrado',
        code: 'USERS_NOT_FOUND',
      },
      HttpStatus.NOT_FOUND,
    );
  }
}

export class InvalidLogin extends HttpException {
  constructor() {
    super(
      {
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Senha ou email incorretos!',
        code: 'INVALID_LOGIN',
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}

export class EmailInvalid extends HttpException {
  constructor() {
    super(
      {
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'o novo email nao pode ser igual ao email antigo',
        code: 'INVALID_EMAIL',
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}

export class EmailIsExists extends HttpException {
  constructor() {
    super(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Email ja cadastrado',
        code: 'INVALID_LOGIN',
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}

export class AutenticacaoError extends HttpException {
  private readonly logger = new Logger(AutenticacaoError.name);

  constructor(error: unknown) {
    super(
      {
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Falha ao manipular token',
        code: 'TOKEN_MANIPULATION_FAILED',
      },
      HttpStatus.UNAUTHORIZED,
    );

    this.logger.error('Erro ao gerar token: ', { error });
  }
}

export class HashError extends HttpException {
  private readonly logger = new Logger(HashError.name);

  constructor(error: unknown) {
    super(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Falha na criptografia e dados',
        code: 'HASH_ERROR',
      },
      HttpStatus.BAD_REQUEST,
    );

    this.logger.error('Erro de na criptografia: ', { error });
  }
}

export class DatabaseError extends HttpException {
  private readonly logger = new Logger(DatabaseError.name);

  constructor(error: unknown) {
    super(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Falha ao manipular banco de dados',
        code: 'DATABASE_ERROR',
      },
      HttpStatus.BAD_REQUEST,
    );

    this.logger.error('Falha ao manipular banco de dados', { error });
  }
}

export class InvalidToken extends HttpException {
  constructor() {
    super(
      {
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Refresh token inválido',
        code: 'TOKEN_INVALID_ERROR',
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}

export class SessionNotFound extends HttpException {
  constructor() {
    super(
      {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Nenhuma sessão encontrada',
        code: 'SESSION_NOT_FOUND',
      },
      HttpStatus.NOT_FOUND,
    );
  }
}

export class UnauthorizedError extends HttpException {
  private readonly logger = new Logger(UnauthorizedError.name);

  constructor(error: unknown) {
    super(
      {
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Não autorizado',
        code: 'UNAUTHORIZED_ERROR',
      },
      HttpStatus.UNAUTHORIZED,
    );

    this.logger.error('Não autorizado: ', { error });
  }
}

export class InvalidName extends HttpException {
  constructor() {
    super(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'O novo nome nao pode ser igual ao antigo',
        code: 'NAME_INVALID_ERROR',
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}

export class InvalidPassword extends HttpException {
  constructor() {
    super(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Senha incorreta',
        code: 'PASSWORD_INVALID_ERROR',
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
