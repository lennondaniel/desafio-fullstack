import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda'
import { TasksRepository } from '../repositories/tasks.repository'
import { TasksService } from '../services/tasks.service'
import { TaskModel } from '../models/tasks.model'
import { DbConnect } from '../database/connection'

const taskRepository = new TasksRepository(TaskModel)
const tasksService = new TasksService(taskRepository) 

export const handler = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  try {
    DbConnect()

    const id = event.pathParameters?.id as string
    const response = await tasksService.deleteTask(id)
  
    return {
      statusCode: 200,
      body: JSON.stringify(response),
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
function dbConnection() {
  throw new Error('Function not implemented.')
}

