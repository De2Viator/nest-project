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
import { UserModule } from './user/modules/user.module';
import { AuthModule } from './auth/modules/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './shared/guards/roles/roles.guard';
import { JwtModule, JwtService } from "@nestjs/jwt";
import { JwtStrategy } from "./auth/strategy/jwt.strategy";
import { JwtStrategyGuard } from "./shared/decorators/wrappers/strategies";

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
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        secret: config.get('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
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
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtStrategyGuard,
    },
  ],
})
export class AppModule {}
