import { Body, Controller, Get, HttpStatus, Post, Req, Res } from "@nestjs/common";
import { userService } from "./user.service";
import { config } from "src/config/config";
var bcrypt = require('bcryptjs');
var jwt = require("jsonwebtoken")


@Controller('/user')
export class userController {
    constructor(
        private readonly userService : userService
    ){}

    @Post('/signup')
    async getUser(@Body() Body, @Req() req, @Res() res){

        let isExist = await this.userService.findUser(Body.email)
        if(isExist){
            res.status(HttpStatus.OK).json({success:false,message:"User Already exist!"})
            return;
        }
        let hashedPassword = await bcrypt.hash(Body?.password,10);

        let user = await this.userService.signUp({...Body,password:hashedPassword})

        let token = await jwt.sign({
            email : user?.email,
            userId : user?._Id
        },config.secret_key)
         
        user.password = undefined;
        
        res.status(HttpStatus.OK).json({user,token})
    }

    @Post('/login')
    async login (
        @Body() Body,
        @Req() req,
        @Res() res
    ){
        let {email ,password} = Body;

        if(!email || !password){
            res.status(HttpStatus.OK).json({success:false,message:"Email or Passeord is missing"})
            return;   
        }
        
        let user = await this.userService.findUser(email);
        if(!user){
            res.status(HttpStatus.OK).json({success:false,message:"User Doesnt Exist!"})
            return;
        }

        let comparePassword = await bcrypt.compare(password , user.password);
        user.password = undefined


        if(comparePassword){
         let token = jwt.sign({
            userId : user._id,
            email:user.email
         },config.secret_key)
         res.status(HttpStatus.OK).json({success:true,user,token})
        }
        else{
            res.status(HttpStatus.OK).json({success:false,message:"wrong password"})
        }
    }
}