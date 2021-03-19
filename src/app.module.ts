import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'common/guard/auth.guard';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { validate } from './config/validation';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { CatsModule } from './module/cats/cats.module';
import { DogsModule } from './module/dogs/dogs.module';

@Module({
  imports: [
    // MongooseModule.forRoot('mongodb://localhost/nest'),
    ConfigModule.forRoot({
      envFilePath: [
        './config/.env.development.local',
        './config/.env.development',
      ],
      validate,
    }),
    CatsModule,
    DogsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('cats');
  }
}
