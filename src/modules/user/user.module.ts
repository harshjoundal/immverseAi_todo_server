import {Module} from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose";
import { Mongoose } from "mongoose";
import { userSchema } from "./user.model";
import { userService } from "./user.service";
import { userController } from "./user.controller";

@Module({
    imports:[MongooseModule.forFeature([{name:"user",schema:userSchema}])],
    controllers:[userController],
    providers:[userService]
})
export class userModule{}