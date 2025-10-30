import { HttpException, HttpStatus, ValidationPipe } from '@nestjs/common';

export function pipesConfig() {
  return new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    exceptionFactory: (errors) => {
      const formattedErrors = errors.map((err) => ({
        type: 'FIELDS_' + err.property.toUpperCase(),
        message: Object.values(err.constraints || {}),
      }));

      return new HttpException(formattedErrors, HttpStatus.BAD_REQUEST);
    },
  });
}
