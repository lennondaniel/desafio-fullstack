import { FaRegTrashAlt, FaPencilAlt } from "react-icons/fa";
import { RiMenuSearchLine } from "react-icons/ri";
import Checkbox from "./Checkbox";
import ButtonActions from "./ButtonActions";
import Card from "./Card";
import { useEffect, useState } from "react";
import SkeletonCard from "./SkeletonCard";
import { HttpService, Task } from "@/services/http.service";

export default function Tasks() {
    const [loading, setLoading] = useState<boolean>(true)
    const [tasks, setTasks] = useState<Task[]>()
    const baseUrl = process.env.NEXT_PUBLIC_API_URL as string
    const service = new HttpService(baseUrl)
    
    useEffect(() => {
        service.get<Task[]>('/task').then((resp) => {
            setTasks(resp)
            setLoading(false)
        })
    }, [])
    return (
        <div className="p-5 flex gap-20 justify-between">
            <div className="w-1/2 ">
                <h1 className="text-gray-500 font-medium mb-4 text-lg">Pendentes</h1>
                {loading && <SkeletonCard /> }
                {!loading && tasks?.map(task => (
                    !task.completed &&
                        <Card key={task._id} task={task} />
                ))}
            </div>
            <div className="w-1/2 ">
                <h1 className="text-gray-500 font-medium mb-4 text-lg">Concluídos</h1>
                {loading && <SkeletonCard /> }
                {!loading && tasks?.map(task => (
                    task.completed &&
                        <Card key={task._id} task={task} />
                ))}
            </div>
        </div>
    )
}