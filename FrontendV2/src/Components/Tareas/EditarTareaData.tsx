import { useLocation, useNavigate, useParams,Navigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { GetAPITareaID } from "@/services/TareaService"
import EditTaskModal from "./EditarModalTarea"
import { useState } from "react"

export default function EditarTareaData() {
    const params = useParams()
    const proyectoid = params.proyectoid!
    

    const navigate = useNavigate()
    

    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const tareaid = queryParams.get('editTareaid')!
    const [, setOpen] = useState(!!tareaid)
    
    
    const {data,isError} = useQuery({
        queryKey: ['tarea',tareaid],
        queryFn: () => GetAPITareaID({proyectoid,tareaid}),
        enabled: !!tareaid // PARA QUITAR EL ERROR DEL GET (que aparece en la consola)
    })

    const handleClose = () => {
        setOpen(false)
        navigate(location.pathname)  // 👈 quita los query params de la URL
    }

    if (isError) return <Navigate to={'/404'}/>
    if (data) return ( 
        <>
        <EditTaskModal
            data={data}
            tareaid={tareaid}
            open={!!tareaid}  
            onClose={handleClose}  
        />
        </>
    )
  
}
