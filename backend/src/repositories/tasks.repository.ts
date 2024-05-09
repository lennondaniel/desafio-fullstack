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

  async findById(id: string): Promise<Task | null> {
    const task = await this.model.findById(id);
    if(!task) {
      throw new Error('Task not found')
    }
    return task
  }

  async update(id: string, {description, completed}: RequestTaskDto): Promise<Task | null> {
    const task = await this.model.findById(id);
    if(!task) {
      throw new Error('Task not found')
    }
    const date = new Date()
    task.description = description
    task.completed = completed
    task.completedAt = completed ? date : null
    return await task.save();
  }

  async delete(id: string): Promise<void> {
    await this.model.findByIdAndDelete(id);
  }
}