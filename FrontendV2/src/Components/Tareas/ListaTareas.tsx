import type { Task, TaskEstado } from "@/types/type"
import CartaTarea from "./CartaTarea"
import { TextAnimateDemo } from "../Animaciones/Texto"
import DropTask from "./DropTask"
import { DndContext } from '@dnd-kit/core'
import type { DragEndEvent } from '@dnd-kit/core'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { UdpadateStats } from "@/services/TareaService"
import { toast } from "react-toastify"
import { useParams } from "react-router-dom"


type tarealistProp = {
    tarea: Task[]
}
const estadoInicial: Record<string, Task[]> = {
    pendiente: [],
    enEspera:[],
    enProgreso:[],
    enRevision:[],
    completada:[]

}

 const coloresTarea : {[key:string] : string} = {
    pendiente: 'border-slate-400',
    enEspera: 'border-green-400',
    enProgreso:'border-amber-400',
    enRevision: 'border-blue-400',
    completada: 'border-red-400'
} // ESTILOS    
 const DiccionarioTarea : {[key:string] : string} = {
    pendiente: 'Pendiente',
    enEspera: 'En Espera',
    enProgreso:'En Progreso',
    enRevision: 'En Revision',
    completada: 'Completada'
} // NO SE NECECITA ESTO PERO LO CREE POR QUE CON ESTO PUEDO HACERE TRADUCCIONES (en otros proyectos)
 // LO USE SOLO POR LOS ESPACIOS (me dio pereza cambias los orginales)
export default function ListaTareas({ tarea }: tarealistProp) {
    const params = useParams()
    const proyectoid = params.proyectoid!
    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn:UdpadateStats,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['proyecto', proyectoid] })
            toast.success(data)
        }
    })

    const groupedTasks = tarea.reduce((acc, task) => {
        let currentGroup = acc[task.estado] ? [...acc[task.estado]] : [];
        currentGroup = [...currentGroup, task]
        return { ...acc, [task.estado]: currentGroup };
    }, estadoInicial);

    const handle = (e: DragEndEvent) => {
        const {over, active} = e
        if(over && over.id){
            const tareaid = active.id.toString()
            const estado = over.id.toString() as TaskEstado
            mutate({proyectoid, tareaid, estado})
        }
    }
    return (

        <>
            <h2 className="text-5xl font-black text-center  text-black my-10"><TextAnimateDemo/></h2>

            <div className='flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32'>
                <DndContext onDragEnd={handle}>
                {Object.entries(groupedTasks).map(([status, tasks]) => (
                    <div key={status} className='min-w-[300px] text-white 2xl:min-w-0 2xl:w-1/5'>
                        <h3 className={`text-center border-t-9 bg-panel-bg hover:bg-primary hover:text-input-text capitalize p-3 ${coloresTarea[status]}`}>{DiccionarioTarea[status]}</h3>
                       <DropTask status={status}/>
                        <ul className='mt-5 space-y-5'>
                            {tasks.length === 0 ? (
                                <li className=" text-black text-xl text-center pt-3">No Hay tareas</li>
                            ) : (
                                tasks.map(task => <CartaTarea key={task._id} tarea={task} />)
                            )}
                        </ul>
                    </div>
                ))}
                </DndContext>
            </div>
        </>
    )
}
