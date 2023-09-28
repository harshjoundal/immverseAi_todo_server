import { BadRequestException, Body, Controller, Get, HttpStatus, Post, Req, Res } from "@nestjs/common";
import { userService } from "./user.service";
import { EmailService } from "./email.service";
import { config } from "src/config/config";
import { OtpService } from "./otp.service";
var bcrypt = require('bcryptjs');
var jwt = require("jsonwebtoken")


@Controller('/user')
export class userController {
    constructor(
        private readonly userService : userService,
        private readonly EmailService : EmailService,
        private readonly OtpService : OtpService
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


    @Post('/requestPasswordReset')
    async requestPasswordReset(@Body() body: { email: string }){
    const { email } = body;
    const user:any = await this.userService.findUser(email);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const otp = this.OtpService.generateOtp();
    user.resetPasswordOtp = otp;
    await this.userService.update(user.id, { resetPasswordOtp: otp });


    const emailSubject = 'Password Reset OTP';
    const emailText = `Your OTP for password reset is: ${otp}`;
    await this.EmailService.sendEmail(email, emailSubject, emailText);
  }

  @Post('/verifyOtp')
  async verifyOtp (
    @Body() body :{email:string,otp:string,newPassword:string},
    @Res() res
  ){

    let {email,otp,newPassword} = body;

    let user:any = this.userService.findUser(email);

    if(otp != user?.resetPasswordOtp){
        throw new BadRequestException('Incorrect OTP');
    }

    let result = this.userService.update(user._id,{password : newPassword});

    res.status(HttpStatus.OK).json({success:true,message :"Password changed successfully!"})
  }
}