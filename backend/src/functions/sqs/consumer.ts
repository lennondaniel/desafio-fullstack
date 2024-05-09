import { SQSEvent } from 'aws-lambda';
import { Task, TaskModel } from '../../models/tasks.model';
import { TasksService } from '../../services/tasks.service';
import { TasksRepository } from '../../repositories/tasks.repository';

const taskRepository = new TasksRepository(TaskModel)
const tasksService = new TasksService(taskRepository)

export const handler = async (event: SQSEvent) => {
    for (const record of event.Records) {

        const task = JSON.parse(record.body) as Task
        await tasksService.sendEmail(task)
    }
};