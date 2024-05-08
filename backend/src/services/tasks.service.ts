import { APIGatewayEvent } from "aws-lambda";
import { RequestTaskDto, ResponseTasksDto } from "../Dtos/tasks.dto";
import { ITaskRepository } from "../interfaces/tasks.interface";
import { Task, TaskModel } from "../models/tasks.model";
import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";
import 'dotenv/config'
import { error } from "console";

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

    async findOneTask(id: string): Promise<Task | null> {
        return await this.respository.findById(id)
    }

    async updateTask(id: string, taskDto: RequestTaskDto): Promise<void> {
        await this.respository.update(id, taskDto)
    }

    async deleteTask(id: string): Promise<void> {
        return await this.respository.delete(id)
    }

    async publishQueueEmail (event: APIGatewayEvent) {

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
            MessageBody: JSON.stringify({
                message: 'Hello from Lambda!',
            }),
        })

        return await sqs.send(message)
    }
}