import { InputHTMLAttributes, useEffect, useState } from "react";

interface Props {
    checked: boolean
}

export default function Checkbox (props: Props) {
    const [checked, setChecked] = useState<boolean>(false)

    useEffect(() => {
        setChecked(props.checked)
    }, [props.checked])
    return (
        <div className="flex justify-center items-center">
            <input
                className="peer relative appearance-none w-5 h-5 border-2 border-gray-400 rounded
                    checked:bg-green-700 checked:border-0
                "
                type="checkbox"
                onChange={(event) => setChecked(event.target.checked)}
                checked={checked}
            />
            <svg
                className="absolute w-3 h-3 pointer-events-none hidden peer-checked:block stroke-white outline-none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
        </div>
    )
}