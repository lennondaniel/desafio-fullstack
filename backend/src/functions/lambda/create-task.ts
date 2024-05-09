import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { RequestTaskDto } from '../../Dtos/tasks.dto'
import { TasksService } from '../../services/tasks.service'
import { TasksRepository } from '../../repositories/tasks.repository'
import { TaskModel } from '../../models/tasks.model'
import { DbConnect } from '../../database/connection'

const taskRepository = new TasksRepository(TaskModel)
const tasksService = new TasksService(taskRepository) 

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {

  try {
    DbConnect()
    const { description, completed } = JSON.parse(event.body!) as RequestTaskDto

    await tasksService.createTask({
      description,
      completed
    })
  
    return {
      statusCode: 200,
      body: JSON.stringify({}),
    }
  } catch (error) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        message: error.message
      }),
    }
  }
  
}
