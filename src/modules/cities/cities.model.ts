import mongoose from "mongoose";


export const cityModel = new mongoose.Schema({
    name :{ type:String,required:true},
    country:{type:String,required:true},
    continent:{type:String,required:true},
    population:{type:String,required:true}
})

export interface IcityModel {
    name:string,
    country:string,
    continent:string,
    population:string
}
