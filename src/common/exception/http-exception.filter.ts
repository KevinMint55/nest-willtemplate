/**
 * 捕获 HttpException 异常
 *
 */

import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

const logger = new Logger();

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const result = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    logger.error(JSON.stringify(result));

    response.status(status).json(result);
  }
}
