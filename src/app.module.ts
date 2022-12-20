import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NewsModule } from './news/modules/news.module';
import { CommentModule } from './comment/modules/comment.module';
import { MailModule } from './mail/modules/mail.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user/services/user.service';
import { UserModule } from './user/modules/user.module';
import { AuthModule } from './auth/modules/auth.module';
import { APP_GUARD } from "@nestjs/core";
import { RolesGuard } from "./shared/guards/roles/roles.guard";
import { JwtService } from "@nestjs/jwt";

@Module({
  imports: [
    NewsModule,
    CommentModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        type: 'postgres',
        port: config.get('DB_PORT'),
        host: config.get('DB_HOST'),
        username: config.get('DB_USER'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME'),
        entities: [join(__dirname, '**', '*.entity.{ts,js}')],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    MailModule,
    ConfigModule.forRoot(),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: RolesGuard },
    JwtService,
  ],
})
export class AppModule {}
