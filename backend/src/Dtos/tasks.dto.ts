import { Task } from "../models/tasks.model"

export interface RequestTaskDto {
    description: string
    completed?: boolean
    completedAt?: Date | null
}

export interface ResponseTasksDto {
    tasks: Task[]
    total: number
    pending: number
    completed: number
}
