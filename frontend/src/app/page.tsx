'use client'
import Header from "@/components/Header";
import Tasks from "@/components/Tasks";
import { ResponseTasks, Task } from "@/interfaces/tasks.interface";
import { HttpService } from "@/services/http.service";
import { useEffect, useState } from "react";

export default function Home() {
  const [tasks, setTasks] = useState<ResponseTasks>()
  const [loading, setLoading] = useState<boolean>(true)
  const baseUrl = process.env.NEXT_PUBLIC_API_URL as string
  const service = new HttpService(baseUrl)
  
  useEffect(() => {
     getTasks()
  }, [])
  const getTasks = () => {
    service.get<ResponseTasks>('/task').then((resp) => {
        setTasks(resp)
        setLoading(false)
    })
  }
  const addTask = (task: string): void => {
    setLoading(true)
    const data: Task = {
      'description': task
    }
    service.post<Task>('/task', data).then((respe) => {
      setLoading(false)
      getTasks()
    })
  }
  return (
    <main className="min-h-screen bg-indigo-300 items-center p-24">
      <div className="container card shadow-lg bg-bright rounded flex flex-col p-10">
        <Header tasks={tasks} isLoading={loading} addTask={addTask} />
        <Tasks tasks={tasks?.tasks} isLoading={loading} />
      </div>
    </main>
  );
}
