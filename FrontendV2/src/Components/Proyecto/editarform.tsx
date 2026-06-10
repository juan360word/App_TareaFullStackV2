import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import ProjectForm from "./formProyecto"
import type { Proyecto, proyectoData } from "@/types/type"
import { useForm } from "react-hook-form"
import { UpdateProyecto } from "@/services/proyectoAPI"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"


type EditarFormProps = {
    data: Proyecto
}

function EditarForm({ data }: EditarFormProps) {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const { register, handleSubmit, formState: { errors }, reset } = useForm<proyectoData>({
        defaultValues: {
            proyectoName: data.proyectoName,
            clientename: data.clientename,
            description: data.description,
        },
    })

    useEffect(() => {
        reset({
            proyectoName: data.proyectoName,
            clientename: data.clientename,
            description: data.description,
        })
    }, [data, reset])

   
    
    const mutation = useMutation({
        mutationFn: (formData: proyectoData) => UpdateProyecto({ id: data._id, formdata: formData }),
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (response) => {
            toast.success(response)
            queryClient.invalidateQueries({ queryKey: ['Proyecto'] })
            queryClient.invalidateQueries({ queryKey: ['editarproyecto', data._id] })
            navigate('/')
        },
    })

    const handleForm = (formData: proyectoData) => {
        mutation.mutate(formData)
    }

    return (
        <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl font-black text-white">Editar Proyecto</h1>
            <p className="text-2xl font-light text-[#a7a9be] mt-5">Modifica el formulario y guarda los cambios</p>
            <nav className="my-5">
                <Link
                    className="bg-[#1A191F] text-[#a7a9be] hover:bg-white hover:text-black px-10 py-3 font-bold cursor-pointer transition-colors"
                    to="/"
                >
                    Volver a Proyectos
                </Link>
            </nav>

            <form
                className="mt-10 shadow-white p-10 rounded-lg"
                onSubmit={handleSubmit(handleForm)}
                noValidate
            >
                <ProjectForm register={register} errors={errors} />
                <input
                    type="submit"
                    value="Guardar Cambios"
                    className="w-full p-3 bg-[#1A191F] text-[#a7a9be] hover:bg-white hover:text-black font-bold cursor-pointer transition-colors"
                />
            </form>
        </div>
    )
}

export default EditarForm
