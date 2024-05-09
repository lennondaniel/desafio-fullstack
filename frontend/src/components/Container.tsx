import { ReactElement } from "react";

interface Props {
    children: ReactElement
}

export default function Container({children,}: Props) {
    return (
        <main className="min-h-screen bg-indigo-300 items-center p-24">
            <div className="container card shadow-lg bg-bright rounded flex flex-col p-10">
                {children}
            </div>
        </main>
    )
}