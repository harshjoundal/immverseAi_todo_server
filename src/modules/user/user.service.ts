import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IuserModel } from "./user.model";


@Injectable()
export class userService {
    constructor(
        @InjectModel("user") private readonly userModel:Model<IuserModel>
    ){}

    async signUp (body){
        try {
            let res = await this.userModel.create(body);
            return res
        } catch (error) {
            return error;
        }
    }

    async findUser (email) {
        let res = await this.userModel.findOne({email})
        return res
    }

    async update (id,body){
        let res = await this.userModel.findByIdAndUpdate(id,{...body})
    }
}