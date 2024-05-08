'use client'
import { ResponseTasks, Task } from "@/interfaces/tasks.interface";
import { HttpService } from "@/services/http.service";
import React, { Dispatch, ReactElement, SetStateAction, createContext, use, useState } from "react";

export type TasksContextType = {
    tasks: ResponseTasks | undefined,
    task: Task | undefined
    taskInput: string
    setTaskInput: Dispatch<SetStateAction<string>>
    isLoading: boolean
    getTasks: () => void
    addTask: (task: string) => void
    showTask: (id: string | undefined) => void
    updateTask: (task: Task) => void
}
interface Props {
    children: ReactElement
}

export const TasksContext = createContext<TasksContextType | undefined>(undefined)
const baseUrl = process.env.NEXT_PUBLIC_API_URL as string
const service = new HttpService(baseUrl)


export default function TasksProvider({ children }: Props) {
    const [tasks, setTasks] = useState<ResponseTasks | undefined>(undefined)
    const [task, setTask] = useState<Task | undefined>(undefined)
    const [taskInput, setTaskInput] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const getTasks = () => {
        service.get<ResponseTasks>('/task').then((resp) => {
            setTasks(resp)
            setIsLoading(false)
        })
    }
    const addTask = (task: string): void => {
        setIsLoading(true)
        const data: Task = {
            'description': task
        }
        service.post<Task>('/task', data).then((respe) => {
            setIsLoading(false)
            setTaskInput('')
            getTasks()
        })
    }

    const showTask = (id: string | undefined): void => {
        service.get<Task>(`/task/${id}`).then((resp) => {
            setTaskInput(resp.description)
            setTask(resp)
        })
    }

    const updateTask = (task: Task): void => {
        setIsLoading(true)

        service.put<Task>(`/task/${task._id}`, task).then((resp) => {
            setIsLoading(false)
            setTaskInput('')
            getTasks()
        })
    }

    return (
        <TasksContext.Provider value={{ 
                tasks, 
                isLoading, 
                taskInput, 
                task, 
                setTaskInput, 
                getTasks, 
                addTask, 
                showTask,
                updateTask
            }}>
            {children}
        </TasksContext.Provider>
    )
}