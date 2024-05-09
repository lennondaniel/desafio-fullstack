import { Document, Model, Schema, model } from "mongoose"

export interface Task {
    description: string
    completed?: boolean
    createdAt?: Date
    completedAt?: Date | null
}

export const taskSchema = new Schema<Task>({
    description: {
        type: String,
        required: true
    },
    completed: { 
        type: Boolean, 
        default: false 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    completedAt: { 
        type: Date, 
        default: null 
    },
})

export const TaskModel = model<Task>('Task', taskSchema)