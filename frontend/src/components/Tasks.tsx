import Card from "./Card";
import { useEffect, useState } from "react";
import SkeletonCard from "./SkeletonCard";
import { Task } from "@/interfaces/tasks.interface";
interface Props {
    tasks: Task[] | undefined
    isLoading: boolean
}
export default function Tasks(props: Props) {
    const [loading, setLoading] = useState<boolean>(true)
    const [tasks, setTasks] = useState<Task[]>()

    useEffect(() => {
            setTasks(props.tasks)
            setLoading(props.isLoading)
    }, [props])
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
                <h1 className="text-gray-500 font-medium mb-4 text-lg">Concluídas</h1>
                {loading && <SkeletonCard /> }
                {!loading && tasks?.map(task => (
                    task.completed &&
                        <Card key={task._id} task={task} />
                ))}
            </div>
        </div>
    )
}