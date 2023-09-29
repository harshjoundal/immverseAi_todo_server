import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {config} from "./config/config"

import {MongooseModule} from "@nestjs/mongoose"
import { userModule } from './modules/user/user.module';
import { todoModule } from './modules/todos/todo.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
@Module({
  imports: [MongooseModule.forRoot(config.mongo_url),
  userModule,
  todoModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}