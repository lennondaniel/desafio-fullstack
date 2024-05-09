'use client'
import { ResponseTasks, Task } from "@/interfaces/tasks.interface";
import { HttpService } from "@/services/http.service";
import React, { Dispatch, ReactElement, SetStateAction, createContext, use, useState } from "react";
import { TypeOptions } from "react-toastify";

interface Toast {
    type: TypeOptions
    message: string
}

export type TasksContextType = {
    tasks: ResponseTasks | undefined,
    task: Task | undefined
    taskInput: string
    isLoading: boolean
    toast: Toast | undefined
    setToast: Dispatch<SetStateAction<Toast | undefined>>
    setTaskInput: Dispatch<SetStateAction<string>>
    getTasks: () => void
    addTask: (task: string) => void
    detailsTask: (id: string | undefined) => Promise<Task>
    showTask: (id: string | undefined) => void
    updateTask: (task: Task) => void
    completeTask: (task: Task) => void
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
    const [toast, setToast] = useState<Toast | undefined>(undefined)

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
        service.post<Task>('/task', data).then(() => {
            setIsLoading(false)
            setTaskInput('')
            getTasks()
            setToast({
                message: 'Task adicionada com sucesso!',
                type: 'success',
            })
        })
    }

    const showTask = (id: string | undefined): void => {
        service.get<Task>(`/task/${id}`).then((resp) => {
            setTaskInput(resp.description)
            setTask(resp)
        })
    }

    const detailsTask = async (id: string | undefined): Promise<Task> => {
        return await service.get<Task>(`/task/${id}`)
    }

    const updateTask = (task: Task): void => {
        setIsLoading(true)
        service.put<Task>(`/task/${task._id}`, task).then((resp) => {
            setIsLoading(false)
            setTaskInput('')
            getTasks()
            setToast({
                message: 'Task atualizada com sucesso!',
                type: 'success',
            })
        })
    }

    const completeTask = (task: Task): void => {
        service.put<Task>(`/task/${task._id}`, task).then((resp) => {
            setIsLoading(false)
            getTasks()
            setToast({
                message: 'Task completada com sucesso!',
                type: 'success',
            })
        })
    }

    return (
        <TasksContext.Provider value={{ 
                tasks, 
                isLoading, 
                taskInput, 
                task, 
                toast,
                setToast,
                setTaskInput, 
                getTasks, 
                addTask, 
                showTask,
                detailsTask,
                updateTask,
                completeTask
            }}>
            {children}
        </TasksContext.Provider>
    )
}