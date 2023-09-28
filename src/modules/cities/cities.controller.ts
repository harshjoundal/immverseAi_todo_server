import { Body, Controller, Get, HttpStatus, Post, Res ,Patch,Param,Delete,Query} from "@nestjs/common";
import { cityService } from "./cities.service";


@Controller("cities")
export class cityController {
    constructor(
       private readonly cityService : cityService 
    ){}

    @Get('/')
    async getcities (@Res() res){
        let result = await this.cityService.getCities()
        res.status(HttpStatus.OK).json({data:result,success:true})

    }

    @Post("/addcities")
    async addCities (@Body() body, @Res() res){
        let result = await this.cityService.addcities(body)
        res.status(HttpStatus.OK).json({data:result,success:true})
    }

    @Patch("/update")
    async updateCity(@Body() Body,@Res() res) {
        let result = await this.cityService.update(Body)
        res.status(HttpStatus.OK).json({data:result,success:true})
    }

    @Get('/findbyId/:id')
    async findOne (@Res() res, @Param() param){
        let result = await this.cityService.findByid(param.id)
        res.status(HttpStatus.OK).json({data:result,success:true})
    }


    @Delete("/delete")
    async deleteone (@Res() res,@Query() query){
        let result = await this.cityService.deleteOne(query.id)
        res.status(HttpStatus.OK).json({data:result,success:true})
    }


    @Get('/getFiledata')
    async sendFileData (@Res() res){
        let file = {"name":"addd"}
        res.status(HttpStatus.OK).json({
            success :true,
            data : file
        })
    }

}