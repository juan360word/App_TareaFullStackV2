import type { NewPasswordForm } from "@/types/type";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { actualizarPWS } from "@/services/AuthApi";
import { toast } from "react-toastify";
import Error from "@/Components/Error";

type NewPasswordFormProps = {
    token: string
}

export default function NewPasswordForm({ token }: NewPasswordFormProps) {
    const navigate = useNavigate()
    const initialValues: NewPasswordForm = {
        pws: '',
        pws_confirmacion: '',
    }
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm({ defaultValues: initialValues });

    const {mutate} = useMutation({
        mutationFn: (formData: NewPasswordForm) => actualizarPWS(token, formData),
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            reset()
            navigate('/login')
        }
    })

    const handleNewPassword = (formData: NewPasswordForm) => mutate(formData)

    const password = watch('pws');

    return (
        <>
            <form onSubmit={handleSubmit(handleNewPassword)} noValidate>
                <div className="flex items-center justify-center mt-10">
                    <div className="flex flex-col gap-2.5 px-8 pb-4 bg-panel-bg rounded-[25px] transition-all duration-400 hover:scale-105 hover:border hover:border-primary min-w-[550px]">

                        <p className="text-center my-8 tracking-widest text-black text-3xl font-medium">
                            Nueva Contraseña
                        </p>

                        <div className="flex flex-col gap-2">
                            <label className="text-text-muted text-sm uppercase font-bold pl-2">Password</label>
                            <div className="flex items-center gap-2 rounded-[25px] p-2.5" style={{ boxShadow: 'inset 2px 5px 10px rgb(5,5,5)' }}>
                                <i className="ti ti-lock text-white text-lg" aria-hidden="true"/>
                                <input
                                    type="password"
                                    placeholder="Nuevo Password"
                                    className="bg-transparent border-none outline-none w-full text-text-muted text-sm"
                                    {...register("pws", {
                                        required: "El Password es obligatorio",
                                        minLength: {
                                            value: 8,
                                            message: 'El Password debe ser mínimo de 8 caracteres'
                                        }
                                    })}
                                />
                            </div>
                            {errors.pws && <Error>{errors.pws.message}</Error>}
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-text-muted text-sm uppercase font-bold pl-2">Repetir Password</label>
                            <div className="flex items-center gap-2 rounded-[25px] p-2.5" style={{ boxShadow: 'inset 2px 5px 10px rgb(5,5,5)' }}>
                                <i className="ti ti-lock text-white text-lg" aria-hidden="true"/>
                                <input
                                    type="password"
                                    placeholder="Repite Password"
                                    className="bg-transparent border-none outline-none w-full text-text-muted text-sm"
                                    {...register("pws_confirmacion", {
                                        required: "Repetir Password es obligatorio",
                                        validate: value => value === password || 'Los Passwords no son iguales'
                                    })}
                                />
                            </div>
                            {errors.pws_confirmacion && <Error>{errors.pws_confirmacion.message}</Error>}
                        </div>

                        <div className="flex justify-center mt-6 mb-8">
                            <input
                                type="submit"
                                value="Establecer Password"
                                className="w-full py-3 rounded-[25px] bg-card-bg text-white hover:bg-primary hover:text-input-text transition-colors duration-400 font-bold text-lg cursor-pointer"
                            />
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}