
import {Schema} from "mongoose"


export const userSchema = new Schema({
    name : {type:String},
    email:{type:String,required:true},
    password:{type:String,required:true}
}) 

export interface IuserModel {
    name ?:string,
    email:string,
    password:string
}