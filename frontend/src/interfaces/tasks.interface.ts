export interface Task {
    _id?: string,
    description: string,
    completed?: boolean,
    completedAt?: string | null,
    createdAt?: string,
}

export interface ResponseTasks {
  tasks: Task[],
  total: number,
  pending: number,
  completed: number
}