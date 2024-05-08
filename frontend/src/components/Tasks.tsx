import Card from "./Card";
import { useContext, useEffect, useState } from "react";
import SkeletonCard from "./SkeletonCard";
import { Task } from "@/interfaces/tasks.interface";
import { TasksContext, TasksContextType } from "./TasksProvider";

export default function Tasks() {
    const {tasks, isLoading} = useContext(TasksContext) as TasksContextType

   
    return (
        <div className="p-5 flex gap-20 justify-between">
            <div className="w-1/2 ">
                <h1 className="text-gray-500 font-medium mb-4 text-lg">Pendentes</h1>
                {isLoading && <SkeletonCard /> }
                {!isLoading && tasks?.tasks.map(task => (
                    !task.completed &&
                        <Card key={task._id} task={task}  />
                ))}
            </div>
            <div className="w-1/2 ">
                <h1 className="text-gray-500 font-medium mb-4 text-lg">Concluídas</h1>
                {isLoading && <SkeletonCard /> }
                {!isLoading && tasks?.tasks.map(task => (
                    task.completed &&
                        <Card key={task._id} task={task} />
                ))}
            </div>
        </div>
    )
}