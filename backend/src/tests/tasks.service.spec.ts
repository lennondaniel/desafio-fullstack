import { ITaskRepository } from "../interfaces/tasks.interface";
import { Task } from "../models/tasks.model";
import { TasksRepository } from "../repositories/tasks.repository";
import { TasksService } from "../services/tasks.service";
import { Mock, mock } from 'ts-jest-mocker'

describe('TasksService', () => {
    let service: TasksService;
    let tasksRepository: Mock<ITaskRepository>;

    const mockReturn = {
        _id: "663a4d53431cc3e40dccd6da",
        description: "teste dsdsds",
        completed: true,
        completedAt: new Date(),
        createdAt: new Date,
        __v: 0
    }

    beforeEach(() => {
        tasksRepository = mock(TasksRepository);
        service = new TasksService(tasksRepository);
    });

    it('should retrieve all tasks successfully', async () => {

        tasksRepository.getAll.mockResolvedValueOnce([mockReturn]);

        const tasks = await service.getTasks();

        expect(tasksRepository.getAll).toHaveBeenCalledTimes(1);
        expect(tasks.tasks.length).toBe(1);
        expect(tasks.tasks[0]).toEqual(mockReturn);
    });

    it('should create task successfully', async () => {

        tasksRepository.create.mockResolvedValueOnce(mockReturn);

        const task = await service.createTask({description: mockReturn.description});

        expect(tasksRepository.create).toHaveBeenCalledTimes(1);
        expect(task).toEqual(mockReturn);
    });

    it('should show task id successfully', async () => {

        tasksRepository.findById.mockResolvedValueOnce(mockReturn);

        const task = await service.findOneTask(mockReturn._id);

        expect(tasksRepository.findById).toHaveBeenCalledTimes(1);
        expect(task).toEqual(mockReturn);
    });

    it('should update task description successfully', async () => {

        const mockUpdated = {...mockReturn, description: "Task updated"}
        tasksRepository.findById.mockResolvedValueOnce(mockReturn);
        tasksRepository.update.mockResolvedValueOnce(mockUpdated);
        
        const task = await service.updateTask(mockReturn._id, mockReturn);

        expect(tasksRepository.update).toHaveBeenCalledTimes(1);
        expect(task).toEqual(mockUpdated);
    });


    it('should delete task successfully', async () => {

        tasksRepository.delete.mockResolvedValueOnce(mockReturn);
        
        await service.deleteTask(mockReturn._id);

        expect(tasksRepository.delete).toHaveBeenCalledTimes(1);
    });
});