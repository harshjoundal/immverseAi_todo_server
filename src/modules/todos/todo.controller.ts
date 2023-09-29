import { Body, Controller, Get, HttpStatus, Param, Post, Query, Req, Res,UseGuards,UnauthorizedException} from "@nestjs/common";
import { todoService } from "./todo.service";
import { AuthGuard } from "../middlewares/AuthMiddleware";
import { ApiTags, ApiResponse,ApiOperation } from '@nestjs/swagger';


@Controller('/todos')
@ApiTags('Todo Controller')
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
    @Post('/deleteTodo/:id')
    async deleteTodo (
        @Body() Body,
        @Res() res,
        @Param() Param
    ){
        const {id} = Param;
        let result = await this.todoService.deleteTodo(id);
        res.status(HttpStatus.OK).json({success:true,data:result})
    }

    @UseGuards(AuthGuard)
    @Post('/update')
    async updateTodo (
        @Body() Body,
        @Res() res,
        @Req() req
    ){
        let decoded_token = req?.Token_decoaded;
        console.log(decoded_token,Body);
        if(decoded_token?.userId != Body?.userId){
            throw new UnauthorizedException();
        }
        
        let result = await this.todoService.updateTodo(Body)
        res.status(HttpStatus.OK).json({
            success : true,
            data : result
        })
    }

    @UseGuards(AuthGuard)
    @Get("/getall/:userId")
     @ApiOperation({ summary: 'Get something' })
     @ApiResponse({ status: 200, description: 'Successful response' })
    async getall (
        @Res() res,
        @Param() param,
        @Query () query
    ){
        let {userId} = param
        let {page,items} = query;
        let result = await this.todoService.getAll({id:userId,page,items})
        res.status(HttpStatus.OK).json(result)
    }
}