import { MouseEvent, ReactElement } from "react"

interface Props {
    onHandler(): void
    children: ReactElement
}
export default function ButtonActions ({ children, onHandler }: Props) {
    return (
        <button onClick={() => onHandler()} className={`bg-gray-200 border border-gray-300 text-gray-800 text-md p-2 rounded`}>
            {children}
        </button>
    )
}