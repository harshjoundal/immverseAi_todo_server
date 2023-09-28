import { Schema } from "mongoose";

export const todoSchema = new Schema ({
    userId :{type:String,required:true},
    todo : {type:String,required:true},
    isCompleted:{type:Boolean,default:false},
    isDeleted : {type:Boolean,default:false}
},{timestamps:true})

export interface ItodoSchema {
     userId :string,
    todo : string,
    isCompletes?:boolean,
    isDeleted ?: boolean
}