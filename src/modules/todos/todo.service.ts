import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ItodoSchema } from "./todo.model";


@Injectable()
export class todoService {
    constructor(
        @InjectModel("todos") private readonly todoModel : Model<ItodoSchema>
    ){}

    async addTodo (body){
        try {
            let res = await this.todoModel.create(body);
            return res
        } catch (error) {
            return error;
        }       
    }

    async deleteTodo (id){
        try {
            let res = await this.todoModel.findByIdAndDelete(id)
            return res
        } catch (error) {
            return error
        }
    }

    async updateTodo (body){
        try {
            let id = body?._id;
            let result = await this.todoModel.findByIdAndUpdate(id,{...body},{new:true})
            return result;
        } catch (error) {
            return error
        }
    }

    async getAll ({id,page,items}){
        try {
            let skipNumber = (page-1) * items
            let result = await this.todoModel.find({userId : id}).skip(skipNumber).limit(items)
            let count = await this.todoModel.find({userId : id}).count()
            return {
                result,
                count
            }
        } catch (error) {
            return error
        }
    }
}