import { Body, Controller, Get, HttpStatus, Param, Post, Req, Res,UseGuards } from "@nestjs/common";
import { todoService } from "./todo.service";
import { AuthGuard } from "../middlewares/AuthMiddleware";


@Controller('/todos')
export class todoController {
    constructor(
        private readonly todoService : todoService
    ){}
    
    
    @UseGuards(AuthGuard)
    @Post('/addTodo')
    async addtodo (
        @Body() Body,
        @Req() req,
        @Res() res
    ){
        let result = await this.todoService.addTodo(Body);
        res.status(HttpStatus.OK).json({success:true,data:result})
    }

    @UseGuards(AuthGuard)
    @Post('/deleteTodo')
    async deleteTodo (
        @Body() Body,
        @Res() res
    ){
        const {id} = Body;
        let result = await this.todoService.deleteTodo(id);
        res.status(HttpStatus.OK).json({success:true,data:result})
    }

    @UseGuards(AuthGuard)
    @Post('/update')
    async updateTodo (
        @Body() Body,
        @Res() res
    ){
        let result = await this.todoService.updateTodo(Body)
        res.status(HttpStatus.OK).json({
            success : true,
            data : result
        })
    }

    @UseGuards(AuthGuard)
    @Get("/getall/:userId")
    async getall (
        @Res() res,
        @Param() param
    ){
        let {userId} = param
        let result = await this.todoService.getAll(userId)
        res.status(HttpStatus.OK).json(result)
    }
}