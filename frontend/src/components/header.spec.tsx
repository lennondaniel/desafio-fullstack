import {fireEvent, render, screen} from "@testing-library/react"

import '@testing-library/jest-dom';
import Header from "./Header"
import TasksProvider, { TasksContext } from "./TasksProvider";

const Component = () => {
    return (
        <TasksProvider>
            <TasksContext.Consumer>
                { () => <Header /> }
            </TasksContext.Consumer>
        </TasksProvider>
    )
}


describe("Home", () => {
    it("should render correctly", () => {
        render(<Component />)

        expect(screen.getByText('Lista de Tarefas')).toBeInTheDocument()
        expect(screen.getByText('TOTAL:')).toBeInTheDocument()
        expect(screen.getByText('PENDENTES:')).toBeInTheDocument()
        expect(screen.getByText('CONCLUÍDAS:')).toBeInTheDocument()
    })

    it("should input task", () => {
        render(<Component />)

        const input = screen.getByLabelText('task-input')
        expect(input.value).toBe('') 
        fireEvent.change(input, {target: {value: 'teste'}})
        expect(input.value).toBe('teste')
    })
})