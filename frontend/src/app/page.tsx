'use client'
import Container from "@/components/Container";
import Header from "@/components/Header";
import Tasks from "@/components/Tasks";
import { TasksContext, TasksContextType } from "@/components/TasksProvider";
import Toast from "@/components/Toast";
import { useContext, useEffect } from "react";

export default function Home() {

  const { getTasks } = useContext(TasksContext) as TasksContextType

  useEffect(() => {
    getTasks()
  }, [])

  return (
    <Container>
      <>
        <Header />
        <Tasks />
        <Toast />
      </>
    </Container>
  );
}
