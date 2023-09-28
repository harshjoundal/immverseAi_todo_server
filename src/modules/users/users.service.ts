import {Injectable} from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IuserModel } from "./users.model";


@Injectable()
export class userService {
    constructor(
        @InjectModel("users") private readonly userModel : Model<IuserModel>
    ){}

    async userRegisterService (body){

        try {
           let res = await this.userModel.create(body)
           return res
        } catch (error) {
            return error
        }
    }

    async findUser (body){
        try {
            let res = await this.userModel.findOne(body)
            return res;
        } catch (error) {
            return error
        }
    }

    async findUserbyid (id){
        try {
           let res = await this.userModel.findById(id)  
           return res
        } catch (error) {
            return error
        }
    }

    async getall ( ){
        try {
            let res = await this.userModel.find();
            return res
        } catch (error) {
            return error
        }
    }

    async deleteUser (user){
        try {
            let res = await this.userModel.deleteOne({_id:user._id})
            return res
        } catch (error) {
            return error
        }
    }

    async updateUser (user){
        try{

            let id = user._id;
            let update = {
                ...user,
                _id:undefined
            }
            
            let res = await this.userModel.findByIdAndUpdate(id,update,{new:true})

            return res
        }
        catch(err){
            return err
        }
    }

}