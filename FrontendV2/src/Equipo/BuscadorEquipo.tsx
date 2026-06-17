import { AddUsuarioAlProyecto } from "@/services/EquipoAPI"
import type { EquipoMiembros } from "@/types/type"
import {useMutation,useQueryClient} from '@tanstack/react-query'
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"


type buscadorProps = {
    user:EquipoMiembros
    reset: () => void
}
const BuscadorEquipo = ({user,reset} : buscadorProps) => {

    const param = useParams()
    const projectId = param.proyectoid!
    const QueryClient = useQueryClient()
    const {mutate} = useMutation({
        mutationFn:AddUsuarioAlProyecto,
        onError: (error) =>{
            toast.error(error.message)
        },
        onSuccess: (data) =>{
            toast.success(data)
            reset()
            QueryClient.invalidateQueries({queryKey:['Equipo',projectId]})
        }
    })

    const handle = () => {
        const data = {
            proyectoId: projectId,
            id: user._id
        }
        mutate(data)
    }


  return (
    <>
        <p className="mt-10 text-center text-text-muted font-bold text-xl">Resultado:</p>
        <div className="flex justify-between items-center bg-card-bg p-5 rounded-lg mt-5">
            <div>
                <p className="text-white text-2xl font-black">{user.name}</p>
                <p className="text-text-muted text-sm">{user.email}</p>
            </div>
            <button
                className="px-8 py-4 bg-panel-bg text-text-muted hover:bg-primary hover:text-input-text font-bold cursor-pointer transition-colors"
                onClick={handle}
            >
                Agregar al Proyecto
            </button>
        </div>
    </>
  )
}

export default BuscadorEquipo