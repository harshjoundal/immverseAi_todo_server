import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {config} from "./config/config"

import {MongooseModule} from "@nestjs/mongoose"
import { cityModule } from './modules/cities/cities.module';
import { usersModule } from './modules/users/users.module';
import { userModule } from './modules/user/user.module';
import { todoModule } from './modules/todos/todo.module';
@Module({
  imports: [MongooseModule.forRoot(config.mongo_url),
  cityModule,
  usersModule,
  userModule,
  todoModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}