'use client'
import Header from "@/components/Header";

export default function Home() {
  const addTask = (task: string) => {

  }
  return (
    <main className="flex min-h-screen flex-col bg-indigo-300 items-center justify-between p-24">
      <div className="container card shadow-lg bg-bright rounded flex justify-start p-10">
        <Header addTask={addTask} />
      </div>
    </main>
  );
}
