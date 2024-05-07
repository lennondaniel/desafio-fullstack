
import { RequestTaskDto } from "../Dtos/tasks.dto";
import { Task } from "../models/tasks.model";

export interface ITaskRepository {
    create(data: Task): Promise<any>;
    getAll(): Promise<Task[]>
    findById(id: string): Promise<Task | null>;
    update(id: string, data: RequestTaskDto): Promise<any | null>;
    delete(id: string): Promise<void>;
}