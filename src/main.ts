import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { engine } from 'express-handlebars';
import * as hbs from 'hbs';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.engine(
    'hbs',
    engine({
      layoutsDir: join(__dirname, '..', 'views/layout'),
      defaultLayout: 'layout',
      extname: 'hbs',
    }),
  );
  hbs.registerPartials(__dirname + 'views/partials');
  app.setViewEngine('hbs');

  const config = new DocumentBuilder()
    .setTitle('News')
    .setDescription('The news API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
