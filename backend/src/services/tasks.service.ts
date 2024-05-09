import { APIGatewayEvent } from "aws-lambda";
import { RequestTaskDto, ResponseTasksDto } from "../Dtos/tasks.dto";
import { ITaskRepository } from "../interfaces/tasks.interface";
import { Task, TaskModel } from "../models/tasks.model";
import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";
import 'dotenv/config'

export class TasksService {
    constructor(readonly respository: ITaskRepository){}

    async createTask(taskDto: RequestTaskDto): Promise<void> {
        const task = new TaskModel(taskDto)
        await this.respository.create(task)
    }

    async getTasks(): Promise<ResponseTasksDto> {
        const tasks = await this.respository.getAll()
        const tasksPending = tasks.filter(task => !task.completed)
        const tasksCompleted = tasks.filter(task => task.completed)
        return {
            tasks: tasks,
            total: tasks.length,
            pending: tasksPending.length,
            completed: tasksCompleted.length
        }
    }

    async findOneTask(id: string): Promise<Task> {
        return await this.respository.findById(id)
    }

    async updateTask(id: string, taskDto: RequestTaskDto): Promise<void> {
        const taskOld = await this.respository.findById(id)
        const date = new Date()
        const completedAt = taskDto.completed ? date : null
        const taskUpdated = await this.respository.update(id, {...taskDto, completedAt: completedAt})
        console.log(taskUpdated)
        console.log(taskOld)
        if(!taskOld.completed && taskUpdated.completed ) {
            this.publishQueueEmail(taskUpdated)
        }
    }

    async deleteTask(id: string): Promise<void> {
        await this.respository.delete(id)
    }

    async publishQueueEmail (task: Task) {

        const sqsUrl: string = `http://${process.env.SQS_HOST}:${process.env.SQS_PORT}`;
        const sqsQueue: string = `${sqsUrl}/000000000000/${process.env.SQS_QUEUE_NAME}`;
        const sqs = new SQSClient({
            endpoint: sqsUrl,
            apiVersion: 'latest',
            region: 'us-east-1',
            credentials: {
                accessKeyId: 'root',
                secretAccessKey: 'root'
            }
        })
        const message =  new SendMessageCommand({
            DelaySeconds: 10,
            QueueUrl: sqsQueue,
            MessageBody: JSON.stringify(task),
        })

        return await sqs.send(message)
    }
}