import { Task } from "@/interfaces/tasks.interface";
import Checkbox from "./Checkbox";
import ButtonActions from "./ButtonActions";
import { RiMenuSearchLine } from "react-icons/ri";
import { FaPencilAlt, FaRegTrashAlt } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";

interface Props {
    task: Task

}

export default function Card ({task}: Props) {
    return (
        <div className="flex justify-between rounded bg-white items-center p-3 mb-5 shadow-sm">
            <div className="flex gap-3">
                {<Checkbox checked={task.completed ?? false }/> || <Skeleton />}
                <p className={`capitalize text-base font-regular text-gray-500 ${task.completed && 'line-through'}`}>{task.description || <Skeleton />}</p>
            </div>
            {
                !task.completed &&
                    <div className="flex gap-3">
                        <ButtonActions>
                            <RiMenuSearchLine />
                        </ButtonActions>
                        <ButtonActions>
                            <FaPencilAlt />
                        </ButtonActions>
                        <ButtonActions>
                            <FaRegTrashAlt />
                        </ButtonActions>
                    </div>
            }
        </div>
    )
}