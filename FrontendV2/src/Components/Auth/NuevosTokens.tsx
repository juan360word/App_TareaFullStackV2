import { PinInput, PinInputField } from '@chakra-ui/pin-input';
import { Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { confirmacionToken } from '@/services/AuthApi';
import { toast } from 'react-toastify';


type NewPasswordTokenProps = {
    onTokenComplete: (token: string) => void,
    token: string,
    setToken: (token: string) => void
}

export default function NewPasswordToken({ onTokenComplete, token, setToken }: NewPasswordTokenProps) {
    const {mutate} = useMutation({
        mutationFn: confirmacionToken,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data, variables) => {
            toast.success(data)
            onTokenComplete(variables.token)
        }
    })

    const handleChange = (_token: string) => {
        setToken(_token)
    }
    const handleComplete = (tokenCompleto: string) => {
        mutate({ token: tokenCompleto })
    }
    return (
        <>
            <form
                className="space-y-8 p-10 rounded-lg bg-white mt-10"
            >
                <label
                    className="font-normal text-2xl text-center block"
                >Código de 6 dígitos</label>
                <div className="flex justify-center gap-5">
                    <PinInput value={token} onChange={handleChange} onComplete={handleComplete}>
                        <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                        <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                        <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                        <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                        <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                        <PinInputField className="h-10 w-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                    </PinInput>
                </div>
            </form>
            <nav className="mt-10 flex flex-col space-y-4">
                <Link
                    to='/reenvioCode'
                    className="text-center text-gray-300 font-normal"
                >
                    Solicitar un nuevo Código
                </Link>
            </nav>
        </>
    )
}