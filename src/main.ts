import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from 'common/exception/http-exception.filter';
import { ValidationPipe } from 'common/pipe/validate.pipe';
import { LoggingInterceptor } from 'common/interceptor/logging.interceptor';
import { TimeoutInterceptor } from 'common/interceptor/timeout.interceptor';
import { ResponseInterceptor } from 'common/interceptor/response.interceptor';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(
    new LoggingInterceptor(),
    new TimeoutInterceptor(),
    new ResponseInterceptor(),
  );
  await app.listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
