import { Navigate, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { GetProyectoid } from "@/services/proyectoAPI"
import EditarForm from "@/Components/Proyecto/editarform"

const EditarProyecto = () => {
    const params = useParams()
    const proyectoid = params.proyectoid!

    const { data, isError, isLoading } = useQuery({
        queryKey: ['editarproyecto', proyectoid],
        queryFn: () => GetProyectoid(proyectoid),
        retry: false,
        staleTime: 0  
    })

    if (isLoading) return <p className="text-white text-2xl text-center">Cargando..</p>
    if (isError) return <Navigate to="/" />

    if (data) return <EditarForm data={data} />

    return null
}

export default EditarProyecto
