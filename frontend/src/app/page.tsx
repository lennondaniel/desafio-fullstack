'use client'
import Header from "@/components/Header";
import Tasks from "@/components/Tasks";

export default function Home() {
  const addTask = (task: string) => {

  }
  return (
    <main className="min-h-screen bg-indigo-300 items-center p-24">
      <div className="container card shadow-lg bg-bright rounded flex flex-col p-10">
        <Header addTask={addTask} />
        <Tasks />
      </div>
    </main>
  );
}
