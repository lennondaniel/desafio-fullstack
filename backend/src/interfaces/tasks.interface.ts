
import { RequestTaskDto } from "../Dtos/tasks.dto";
import { Task } from "../models/tasks.model";

export interface ITaskRepository {
    create(data: Task): Promise<Task>;
    getAll(): Promise<Task[]>
    findById(id: string): Promise<Task>;
    update(id: string, data: RequestTaskDto): Promise<Task>;
    delete(id: string): Promise<Task | null>;
}