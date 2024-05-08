import { HTMLInputTypeAttribute, InputHTMLAttributes } from "react";

export default function Checkbox ({...props}: InputHTMLAttributes<HTMLInputElement>) {
    return (
        <div className="flex justify-center items-center">
            <input
                className="peer relative appearance-none w-4 h-4 border-2 border-gray-400 rounded
                    checked:bg-green-700 checked:border-0
                "
                type="checkbox"
                {...props}
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