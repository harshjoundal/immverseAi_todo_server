import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { userSchema } from "./users.model";
import { userService } from "./users.service";
import { usersController } from "./users.controller";



@Module({
    imports:[MongooseModule.forFeature([{name:"users",schema:userSchema}])],
    providers:[userService],
    controllers:[usersController]
})
export class usersModule {}