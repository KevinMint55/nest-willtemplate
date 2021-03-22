import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'common/guard/auth.guard';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { CatsModule } from './module/cats/cats.module';
import { DogsModule } from './module/dogs/dogs.module';
import { AuthModule } from './module/auth/auth.module';
import { UsersModule } from './module/users/users.module';
import config from 'config';

@Module({
  imports: [
    MongooseModule.forRoot(config.MONGODB_URL, { useNewUrlParser: true }),
    CatsModule,
    DogsModule,
    AuthModule,
    UsersModule,
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
