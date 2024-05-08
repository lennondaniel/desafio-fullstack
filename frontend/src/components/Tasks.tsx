import { FaRegTrashAlt, FaPencilAlt } from "react-icons/fa";
import { RiMenuSearchLine } from "react-icons/ri";
import Checkbox from "./Checkbox";
import ButtonActions from "./ButtonActions";

export default function Tasks() {
    const tasks = [
        {
            "_id": "663a4b83f2ded5771ccde86e",
            "description": "teste",
            "completed": false,
            "completedAt": null,
            "createdAt": "2024-05-07T15:40:51.819Z",
            "__v": 0
        },
        {
            "_id": "663a4d53431cc3e40dccd6da",
            "description": "teste",
            "completed": false,
            "completedAt": null,
            "createdAt": "2024-05-07T15:48:35.023Z",
            "__v": 0
        },
        {
            "_id": "663a612cd1b87152b842c544",
            "description": "teste update",
            "completed": true,
            "completedAt": null,
            "createdAt": "2024-05-07T17:13:16.686Z",
            "__v": 0
        },
    ]
    return (
        <div className="p-5 flex gap-20 justify-between">
            <div className="w-1/2 ">
                <h1 className="text-gray-500 font-medium mb-4 text-lg">Pendentes</h1>
            { tasks.map(task => (
                !task.completed &&
                    <div className="flex justify-between rounded bg-white items-center p-3 mb-5 shadow-sm" key={task._id}>
                        <div className="flex gap-3">
                            <Checkbox/>
                            <p className="capitalize text-base font-regular text-gray-500">{task.description}</p>
                        </div>
                        <div className="flex gap-3">
                            <ButtonActions color="bg-details">
                                <RiMenuSearchLine />
                            </ButtonActions>
                            <ButtonActions color="bg-primary">
                                <FaPencilAlt />
                            </ButtonActions>
                            <ButtonActions color="bg-danger">
                                <FaRegTrashAlt />
                            </ButtonActions>
                        </div>
     
                    </div>
            ))}
            </div>
            <div className="w-1/2 ">
                <h1 className="text-gray-500 font-medium mb-4 text-lg">Concluídos</h1>
            { tasks.map(task => (
                task.completed &&
                    <div className="flex justify-start gap-3 rounded bg-white items-center p-3 mb-5 shadow-sm" key={task._id}>
                        <Checkbox checked={task.completed ?? false}/>
                        <p className="capitalize text-base font-regular text-gray-500 line-through">{task.description}</p>
                    </div>
            ))}
            </div>
        </div>
    )
}