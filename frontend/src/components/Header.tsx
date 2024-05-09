import { KeyboardEvent, useContext, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import Spinner from "./Spinner";
import { TasksContext, TasksContextType } from "./TasksProvider";

export default function Header () {

    const [valid, setValid] = useState<boolean>(true)
    const {tasks, taskInput, setTaskInput, addTask, isLoading, updateTask, task} = useContext(TasksContext) as TasksContextType
    
    const onSubmit = () => {
        if(!taskInput) {
            setValid(false)
            return
        }
        if(task){
            updateTask({...task, description: taskInput})
        } else {
            addTask(taskInput)
        }
    }

    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onSubmit();
        }
    };

    useEffect(() => {
        if(taskInput) {
            setValid(true)
        }

    }, [taskInput])

    return (
        <div className="flex flex-col gap-8 w-auto">
            <h1 className="font-bold font-sans text-blue-600 tex text-2xl">Lista de Tarefas</h1>
            <div className="flex justify-start gap-5">
                <div className="bg-purple-400 p-2 rounded text-purple-950 font-semibold text-xs">
                    TOTAL: {tasks?.total}
                </div>
                <div className="bg-red-300 text-red-950 p-2 font-semibold text-xs rounded">
                    PENDENTES: { tasks?.pending}
                </div>
                <div className="bg-green-400 text-green-950 p-2 font-semibold text-xs rounded">
                    CONCLUÍDAS: { tasks?.completed}
                </div>
            </div>
            <div className="flex flex-col">
                <div className={`border-b-2 ${valid ? 'border-blue-600' : 'border-danger'}  flex justify-between`}>
                    <input type="text" className="bg-transparent focus:outline-none w-full h-full p-2"
                        aria-label="task-input"
                        onChange={(event) => setTaskInput(event.target.value)} 
                        value={taskInput}
                        onKeyDown={(event) => handleKeyPress(event)}
                        placeholder="Adicionar nova tarefa" />
                    <button disabled={isLoading} className="bg-blue-600 text-white text-lg p-2 mb-1 w-20 h-10 
                        rounded flex justify-center items-center" 
                        aria-label="task-button"
                        onClick={() => onSubmit()}>
                        {isLoading && <Spinner />}
                        {!isLoading && <FaPlus />}
                    </button>
                </div>
                {
                    !valid && 
                        <div className="bg-danger rounded w-60 text-center text-white p-2 mt-1">Digite a sua tarefa</div>
                }

            </div>

        </div>
    )
}