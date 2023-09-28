import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { todoSchema } from "./todo.model";
import { todoController } from "./todo.controller";
import { todoService } from "./todo.service";



@Module({
    imports:[MongooseModule.forFeature([{name:'todos',schema:todoSchema}])],
    controllers:[todoController],
    providers:[todoService]
})
export class todoModule{}