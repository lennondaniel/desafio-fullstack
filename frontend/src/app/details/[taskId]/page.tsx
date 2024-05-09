'use client'
import Container from "@/components/Container";
import { TasksContext, TasksContextType } from "@/components/TasksProvider";
import { Task } from "@/interfaces/tasks.interface";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { FaArrowCircleLeft } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

export default function Details() {
    const { taskId } = useParams<{ taskId: string }>()
    const { detailsTask } = useContext(TasksContext) as TasksContextType
    const [task, setTask] = useState<Task>()

    useEffect(() => {
        detailsTask(taskId).then((resp) => {
            setTask(resp)
        })
    }, [])
    return (
        <Container>
            <> 
            {
                task && <div className="flex flex-col gap-5">
                    <Link className="text-xl" href='/'><FaArrowCircleLeft /></Link>
                    <p className="text-blue-600 font-bold text-2xl capitalize">{task?.description}</p>
                    <p className="font-regular text-lg"><span className="font-bold text-lg text-gray-700">Status: </span>{task?.completed ? 'Concluída' : 'Pendente'}</p>
                    {task?.completed && <p className="font-regular text-lg"><span className="font-bold text-lg text-gray-700">Concluído em: </span> {new Date(task?.completedAt ?? '').toLocaleString('pt-BR')}</p>}
                    <p className="font-regular text-lg"><span className="font-bold text-lg text-gray-700">Criado em: </span> {new Date(task?.createdAt ?? '').toLocaleString('pt-BR')}</p>
                </div>
            }
            {
                !task && <div className="flex flex-col gap-5">
                    <Link className="text-xl" href='/'><FaArrowCircleLeft /></Link>
                    <p><Skeleton /></p>
                    <p><Skeleton /></p>
                    <p><Skeleton /></p>
                </div>
            }
            </>

        </Container>
    )
}