import { Test, TestingModule } from '@nestjs/testing';
import { todoService as TodoService } from './todo.service';

describe('TodoService', () => {
  let todoService: TodoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodoService],
    }).compile();

    todoService = module.get<TodoService>(TodoService);
  });

  it('should be defined', () => {
    expect(todoService).toBeDefined();
  });

  it('should return an array of todos', async () => {
    const todos = await todoService.getAll("65151719fb4c6ac291d4c867");
    expect(todos).toEqual(expect.arrayContaining([])); 
  });
});
