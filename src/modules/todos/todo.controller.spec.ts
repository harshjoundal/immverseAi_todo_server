
import { Test, TestingModule } from '@nestjs/testing';
import { todoController as TodoController } from './todo.controller';
import {todoService as TodoService } from './todo.service';

describe('TodoController', () => {
  let todoController: TodoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [TodoService],
    }).compile();

    todoController = module.get<TodoController>(TodoController);
  });

  it('should be defined', () => {
    expect(todoController).toBeDefined();
  });

  it('should return an array of todos', async () => {
    const todos = await todoController.getall("res",{userId:"65151719fb4c6ac291d4c867"});
    expect(todos).toEqual(expect.arrayContaining([]));
  });

});
