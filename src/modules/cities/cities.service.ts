import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { IcityModel, cityModel } from "./cities.model";
import { Model } from "mongoose";


@Injectable()
export class cityService {
    constructor(
        @InjectModel("cities") private readonly citymodel:Model<IcityModel>
    ){}

    async getCities (){
        let res = await this.citymodel.find();
        return res
    }
    async addcities (body : Array<object>){
        let res = await this.citymodel.insertMany([...body])
        return res
    }

    async update(body){
        let res = await this.citymodel.updateOne({name:body.name},{name:"Kolhapur"},{new:true})
        return res;
    }

    async findByid(id){
        let res = await this.citymodel.findById(id);
        return res
    }

    async deleteOne(id){
        let res = await this.citymodel.findByIdAndDelete({_id:id})
        return res
    }
}