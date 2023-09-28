import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Mongoose } from "mongoose";
import { cityModel } from "./cities.model";
import { cityController } from "./cities.controller";
import { cityService } from "./cities.service";

@Module({
    imports:[MongooseModule.forFeature([{name:"cities",schema:cityModel}])],
    controllers:[cityController],
    providers:[cityService]
})
export class cityModule {}