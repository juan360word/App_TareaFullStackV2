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
            <div className="flex items-center justify-center mt-10">
                <div className="flex flex-col gap-2.5 px-8 pb-4 bg-panel-bg rounded-[25px] transition-all duration-400 hover:scale-105 hover:border hover:border-primary min-w-[550px]">
                    <p className="text-center my-8 tracking-widest text-white text-3xl font-medium">
                        Código de 6 dígitos
                    </p>
                    <div className="flex justify-center gap-5 mb-4">
                        <PinInput value={token} onChange={handleChange} onComplete={handleComplete}>
                            <PinInputField className="h-14 w-14 text-center text-2xl font-black bg-transparent border-2 border-primary rounded-xl text-primary focus:outline-none focus:ring-2 focus:ring-primary" />
                            <PinInputField className="h-14 w-14 text-center text-2xl font-black bg-transparent border-2 border-primary rounded-xl text-primary focus:outline-none focus:ring-2 focus:ring-primary" />
                            <PinInputField className="h-14 w-14 text-center text-2xl font-black bg-transparent border-2 border-primary rounded-xl text-primary focus:outline-none focus:ring-2 focus:ring-primary" />
                            <PinInputField className="h-14 w-14 text-center text-2xl font-black bg-transparent border-2 border-primary rounded-xl text-primary focus:outline-none focus:ring-2 focus:ring-primary" />
                            <PinInputField className="h-14 w-14 text-center text-2xl font-black bg-transparent border-2 border-primary rounded-xl text-primary focus:outline-none focus:ring-2 focus:ring-primary" />
                            <PinInputField className="h-14 w-14 text-center text-2xl font-black bg-transparent border-2 border-primary rounded-xl text-primary focus:outline-none focus:ring-2 focus:ring-primary" />
                        </PinInput>
                    </div>
                    <nav className="text-center mb-4">
                        <Link
                            to='/reenvioCode'
                            className="inline-block w-full  text-white font-normal rounded-[25px] p-2.5 transition-colors"
                            style={{ boxShadow: 'inset 2px 5px 10px rgb(5,5,5)' }}
                        >
                            Solicitar un nuevo Código
                        </Link>
                    </nav>
                </div>
            </div>
        </>
    )
}