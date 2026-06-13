import type { Task } from "@/types/type"
import CartaTarea from "./CartaTarea"
import { TextAnimateDemo } from "../Animaciones/Texto"



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

 <h1 className="border-blue-400"></h1>

    const groupedTasks = tarea.reduce((acc, task) => {
        let currentGroup = acc[task.estado] ? [...acc[task.estado]] : [];
        currentGroup = [...currentGroup, task]
        return { ...acc, [task.estado]: currentGroup };
    }, estadoInicial);
    console.log(groupedTasks)
    return (

        <>
            <h2 className="text-5xl font-black text-center  text-white  my-10"><TextAnimateDemo/></h2>

            <div className='flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32'>
                {Object.entries(groupedTasks).map(([status, tasks]) => (
                    <div key={status} className='min-w-[300px] text-white 2xl:min-w-0 2xl:w-1/5'>
                        <h3 className={`text-center border-t-9 bg-[#1A191F] hover:bg-white hover:text-black capitalize p-3 ${coloresTarea[status]}`}>{DiccionarioTarea[status]}</h3>
                        <ul className='mt-5 space-y-5'>
                            {tasks.length === 0 ? (
                                <li className=" text-white text-xl text-center pt-3">No Hay tareas</li>
                            ) : (
                                tasks.map(task => <CartaTarea key={task._id} tarea={task} />)
                            )}
                        </ul>
                    </div>
                ))}
            </div>
        </>
    )
}
