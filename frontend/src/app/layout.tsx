import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TasksProvider from "@/components/TasksProvider";
import { ReactElement } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tarefas",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactElement;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <TasksProvider>
          {children}
        </TasksProvider>
      </body>
    </html>
  );
}
