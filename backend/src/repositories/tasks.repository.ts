import { Model } from "mongoose";
import { ITaskRepository } from "../interfaces/tasks.interface";
import { Task } from "../models/tasks.model";
import { RequestTaskDto } from "../Dtos/tasks.dto";

export class TasksRepository implements ITaskRepository {
  constructor(private readonly model: Model<Task>) {}

  async create(data: Task): Promise<void> {
    await this.model.create(data);
  }

  async getAll(): Promise<Task[]> {
    return await this.model.find({});
  }

  async findById(id: string): Promise<Task> {
    const task = await this.model.findById(id);
    if(!task) {
      throw new Error('Task not found')
    }
    return task
  }

  async update(id: string, taskDto: RequestTaskDto): Promise<Task> {
      const task = await this.model.findByIdAndUpdate(id, taskDto, {returnDocument: 'after'})
      if(!task) {
        throw new Error('Not found update task')
      }
      return task
  }

  async delete(id: string): Promise<void> {
    await this.model.findByIdAndDelete(id);
  }
}