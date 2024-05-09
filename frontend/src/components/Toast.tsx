import { useContext, useEffect, useState } from "react";
import { ToastContainer, toast as toastEmitter } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TasksContext, TasksContextType } from "./TasksProvider";

export default function Toast () {
    const {toast, setToast} = useContext(TasksContext) as TasksContextType
    
    useEffect(() => {
        if(toast) {
            toastEmitter(toast?.message, {
                type: toast?.type,
                onClose: () => setToast(undefined)
            })
        }
    }, [toast])
    return (
        <ToastContainer
            position="bottom-right" 
        />
    )
}