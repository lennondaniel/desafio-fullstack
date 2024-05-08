import { ChangeEvent, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import Spinner from "./Spinner";
import { ResponseTasks } from "@/interfaces/tasks.interface";
interface Props {
    addTask(task: string): void
    tasks: ResponseTasks | undefined
    isLoading: boolean
}

export default function Header (props: Props) {
    const [task, setTask] = useState<string>('')
    const [valid, setValid] = useState<boolean>(true)
    const [loading, setLoading] = useState<boolean>(true)
    const [tasks, setTasks] = useState<ResponseTasks>()
    
    const onChangeTask = () => {
        if(!task) {
            setValid(false)
            return
        }
        props.addTask(task)
        setTask('')
    }

    useEffect(() => {
        if(task) {
            setValid(true)
        }
        setLoading(props.isLoading)
        setTasks(props.tasks)
        if(props.tasks) {
            setTasks(props.tasks)
        }
    }, [props])

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
                        onChange={(event) => setTask(event.target.value)} 
                        value={task}
                        placeholder="Adicionar nova tarefa" />
                    <button disabled={loading} className="bg-blue-600 text-white text-lg p-2 mb-1 w-20 h-10 rounded flex justify-center items-center" onClick={() => onChangeTask()}>
                        {loading && <Spinner />}
                        {!loading && <FaPlus />}
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