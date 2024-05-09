import { useEffect, useState } from "react"

interface Props {
    id: string | undefined,
    isShow: boolean
    confirmHandler(id: string | undefined): void
    cancelHandler(state: boolean): void
}

export default function ConfirmModal({id, isShow, confirmHandler, cancelHandler}: Props) {
    const [visible, setVisible] = useState<boolean>(false)

    const cancel = () => {
        setVisible(false)
        cancelHandler(false)
    }

    const confirm = () => {
        confirmHandler(id)
        setVisible(false)
        cancelHandler(false)
    }
    
    useEffect(() => {
        setVisible(isShow)
    }, [isShow])
    return (
        <div className={`${visible ? 'flex' : 'hidden'} fixed inset-0 items-center justify-center z-50 backdrop-blur-sm`}>
            <div className="relative px-4 min-h-screen flex items-center justify-center">
                <div className=" opacity-25 w-full h-full absolute z-10 inset-0"></div>
                <div className="bg-white rounded-lg max-w-md mx-auto p-4 inset-x-0 bottom-0 z-50 mb-4 relative shadow-md">
                    <div className="flex items-center">
                        <div className="mt-0 ml-6 text-center">
                            <p className="font-bold">Atenção!</p>
                            <p className="text-sm text-gray-700 mt-1">
                                Tem certeza que deseja apagar essa tarefa?    
                            </p>
                        </div>
                    </div>
                    <div className="text-right mt-4 flex justify-end">
                        <button onClick={() => confirm()} className="block w-full px-4 py-3 bg-red-200 text-red-700 rounded-lg font-semibold text-sm ml-2 order-2">
                            Deletar
                        </button>
                        <button onClick={() => cancel()} className="block w-full px-4 py-3 bg-gray-200 rounded-lg font-semibold text-sm mt-0 order-1">
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </div>
        )
}