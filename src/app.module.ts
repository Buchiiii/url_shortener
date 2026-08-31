import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TransformResponseInterceptor } from './core/interceptors/transform-response.interceptor';
import { LinksModule } from './modules/links/links.module';
import { LinksService } from './modules/links/links.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CoreModule } from './core/core.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('connection_uri'),
      }),
      inject: [ConfigService],
    }), LinksModule, CoreModule
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_INTERCEPTOR,
    useClass: TransformResponseInterceptor,
  }],
})
export class AppModule { }
