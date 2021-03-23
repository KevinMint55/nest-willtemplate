import { HttpException, HttpStatus } from '@nestjs/common';

export class BusinessException extends HttpException {
  constructor(statusCode: number, message: string, data: any = undefined) {
    super({ statusCode, message, data }, HttpStatus.OK);
  }
}
