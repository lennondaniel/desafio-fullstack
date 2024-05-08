import {ReactElement} from "react"

interface Props {
    color: string
    children: ReactElement
}
export default function ButtonActions ({color, children}: Props) {
    return (
        <button className={`${color} text-white text-sm p-2 rounded`}>
            {children}
        </button>
    )
}