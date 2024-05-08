'use client'
import Header from "@/components/Header";
import Tasks from "@/components/Tasks";
import { TasksContext, TasksContextType } from "@/components/TasksProvider";
import { useContext, useEffect, useState } from "react";

export default function Home() {

  const {getTasks} = useContext(TasksContext) as TasksContextType
  
  useEffect(() => {
     getTasks()
  }, [])

  return (
    <main className="min-h-screen bg-indigo-300 items-center p-24">
      <div className="container card shadow-lg bg-bright rounded flex flex-col p-10">
        <Header />
        <Tasks />
      </div>
    </main>
  );
}
