import { Task } from "@/interfaces/tasks.interface";
import Checkbox from "./Checkbox";
import ButtonActions from "./ButtonActions";
import { RiMenuSearchLine } from "react-icons/ri";
import { FaPencilAlt, FaRegTrashAlt } from "react-icons/fa";
import { useContext } from "react";
import { TasksContext, TasksContextType } from "./TasksProvider";
import { useRouter } from "next/navigation";

interface Props {
    task: Task
}

export default function Card ({task}: Props) {
    const {showTask} = useContext(TasksContext) as TasksContextType
    const router = useRouter()

    const detailsTask = () => {
        router.push(`/details/${task?._id}`)
    }

    return (
        <div className="flex justify-between rounded bg-white items-center p-3 mb-5 shadow-sm">
            <div className="flex gap-3">
                {<Checkbox task={task} checked={task.completed ?? false } />}
                <p className={`capitalize text-base font-regular text-gray-500 ${task.completed && 'line-through'}`}>{task.description || <Skeleton />}</p>
            </div>
        
               
            <div className="flex gap-3">
                <ButtonActions onHandler={() => detailsTask()}>
                    <RiMenuSearchLine />
                </ButtonActions>
                {
                    !task?.completed && 
                    <>
                        <ButtonActions onHandler={() => showTask(task?._id)}>
                            <FaPencilAlt />
                        </ButtonActions>
                        <ButtonActions onHandler={() => showTask(task?._id)}>
                            <FaRegTrashAlt />
                        </ButtonActions>
                    </>
                        
                }
               
            </div>
            
        </div>
    )
}