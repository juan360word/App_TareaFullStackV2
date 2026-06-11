import type { Task, TareaData } from "@/types/type"
import CartaTarea from "./CartaTarea"




type tarealistProp = {
    tarea: Task[]
}
type agrupadro = {
    [key: string] : Task[]
}

const estadoInicial = {
    pendiente: [],
    enEspera:[],
    enProgreso:[],
    enRevision:[],
    completada:[]

}

export default function ListaTareas({ tarea }: tarealistProp) {
    const groupedTasks = tarea.reduce((acc, task) => {
        let currentGroup = acc[task.estado] ? [...acc[task.estado]] : [];
        currentGroup = [...currentGroup, task]
        return { ...acc, [task.estado]: currentGroup };
    }, estadoInicial);
    console.log(groupedTasks)
    return (

        <>
            <h2 className="text-5xl font-black my-10">Tareas</h2>

            <div className='flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32'>
                {Object.entries(groupedTasks).map(([status, tasks]) => (
                    <div key={status} className='min-w-[300px] 2xl:min-w-0 2xl:w-1/5'>
                        <ul className='mt-5 space-y-5'>
                            {tasks.length === 0 ? (
                                <li className="text-gray-500 text-center pt-3">No Hay tareas</li>
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
