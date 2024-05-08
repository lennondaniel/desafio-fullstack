import { ReactElement } from "react"

interface Props {
    children: ReactElement
}
export default function ButtonActions ({ children }: Props) {
    return (
        <button className={`bg-gray-200 border border-gray-300 text-gray-800 text-md p-2 rounded`}>
            {children}
        </button>
    )
}