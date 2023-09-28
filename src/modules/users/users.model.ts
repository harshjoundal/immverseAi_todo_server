import { MongooseModule } from "@nestjs/mongoose";
import { Schema } from "mongoose";


const permissionsModel = new Schema ({
    read : {type: String,required : true, default:false},
    write : {type: String,required : true, default:false},
    delete : {type: String,required : true, default:false}
},{_id:false})

const PermissonModel = new Schema ({
    USER : {
        type : permissionsModel,
        required:true
    },
    WEBSITE:{
        type : permissionsModel,
        required:true
    }
},{_id:false})


export const userSchema = new Schema({
    name : {type:String, required : true},
    role : {type:String, required : true,default:"USER"},
    permission:{type:PermissonModel,default :{
         USER : {
            read : true,
            write:false,
            delete:false
        },
        WEBSITE:{
            read : true,
            write:false,
            delete:false
        }
    }},
    email :{type:String, required : true},
    password :{type:String,required:true},
    accessToken:{type:String}
})

export interface IuserModel {
    name : string,
    role:string,
    permission:Object,
    email:string,
    password:string,
    accessToken:string
}