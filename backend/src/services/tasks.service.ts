import { RequestTaskDto } from "../Dtos/tasks.dto";
import { ITaskRepository } from "../interfaces/tasks.interface";
import { Task, TaskModel } from "../models/tasks.model";

export class TasksService {
    constructor(readonly respository: ITaskRepository){}

    async createTask(taskDto: RequestTaskDto): Promise<void> {
        const task = new TaskModel(taskDto)
        await this.respository.create(task)
    }

    async getTasks(): Promise<Task[]> {
        return await this.respository.getAll()
    }

    async findOneTask(id: string): Promise<Task | null> {
        return await this.respository.findById(id)
    }

    async updateTask(id: string, taskDto: RequestTaskDto): Promise<void> {
        await this.respository.update(id, taskDto)
    }

    async deleteTask(id: string): Promise<void> {
        return await this.respository.delete(id)
    }
}