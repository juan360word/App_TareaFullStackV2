import { Navigate, useNavigate, useParams, useSearchParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { GetProyectoid } from "@/services/proyectoAPI"
import AddTaskModal from "@/Components/Tareas/AgregaTareaModal"

const DetallesProyecto = () => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()

    const params = useParams()
    const proyectoid = params.proyectoid!

    const { data, isError, isLoading } = useQuery({
        queryKey: ['editarproyecto', proyectoid],
        queryFn: () => GetProyectoid(proyectoid),
        retry: false,
        staleTime: 0  
    })

    const showModal = searchParams.get('nuevaTarea') === 'true'

    const openModal = () => {
        navigate(`/proyecto/${proyectoid}?nuevaTarea=true`)
    }

    const closeModal = () => {
        navigate(`/proyecto/${proyectoid}`)
    }

    if (isLoading) return <p className="text-white text-2xl text-center">Cargando..</p>
    if (isError) return <Navigate to="/" />

    if (data) {
        return (
            <>
                <h1 className="text-5xl text-white font-black">{data.proyectoName}</h1>
                <p className="text-[#a7a9be] text-2xl font-light mt-6">{data.description}</p>

                <nav className="my-5 flex gap-3.5">
                    <button
                        type="button"
                        onClick={openModal}
                        className="px-8 py-4 bg-[#1A191F] hover:bg-[#ff8906] hover:text-white transition-colors text-white text-xl font-bold cursor-pointer"
                    >
                        Agregar Tarea
                    </button>
                </nav>

                <AddTaskModal open={showModal} onClose={closeModal} />
            </>
        )
    }

    return null
}

export default DetallesProyecto
