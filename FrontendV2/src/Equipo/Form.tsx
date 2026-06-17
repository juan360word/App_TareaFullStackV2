import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import Error from "@/Components/Error";
import type { EquipoMiembrosForm } from "@/types/type";
import { EncontrarMiembro } from "@/services/EquipoAPI";
import BuscadorEquipo from "./BuscadorEquipo";


export default function FormA() {
    const initialValues: EquipoMiembrosForm = {
        email: ''
    }
    const params = useParams()
    const projectId = params.proyectoid!

    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues })

    const mutation = useMutation({
        mutationFn:EncontrarMiembro
    })

    const handleSearchUser = async (formdata :EquipoMiembrosForm) => {
        const data = {proyectoId: projectId, formdata}
        mutation.mutate(data)
    }

    const resetData = () => [
        reset(),
        mutation.reset()
    ]

    return (
        <>

            <form
                className="mt-10 space-y-5"
                onSubmit={handleSubmit(handleSearchUser)}
                noValidate
            >

                <div className="flex flex-col gap-3">
                    <label
                        className="font-normal text-2xl text-white"
                        htmlFor="name"
                    >E-mail de Usuario</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="E-mail del usuario a Agregar"
                        className="w-full p-3 bg-card-bg text-white border border-border-soft rounded-lg focus:outline-none focus:border-primary transition-colors"
                        {...register("email", {
                            required: "El Email es obligatorio",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "E-mail no válido",
                            },
                        })}
                    />
                    {errors.email && (
                        <Error>{errors.email.message}</Error>
                    )}
                </div>

                <input
                    type="submit"
                    className="w-full p-3 bg-panel-bg text-text-muted hover:bg-primary hover:text-input-text font-bold text-xl cursor-pointer transition-colors"
                    value='Buscar Usuario'
                />
            </form>
            {mutation.isPending && <p className="text-3xl text-center text-text-muted">Cargando...</p>} 
            {mutation.error && <p className="text-3xl text-center text-red-400">{mutation.error.message}</p>} 
            {mutation.data && <BuscadorEquipo user={mutation.data} reset={resetData}/>}
        </>
    )
}