import { isAxiosError } from "axios";
import api from "@/lib/Axios";
import type { NotaData, Proyecto, Task } from "@/types/type";


type NotaType = {
    formData: NotaData,
    proyectoId:Proyecto['_id'],
    tareaID:Task['_id']
}



export async function CreacionNota({formData,proyectoId,tareaID}: Pick<NotaType,'formData' | 'proyectoId' | 'tareaID'>) {
    try {
        const url = `/Proyecto/${proyectoId}/tareas/${tareaID}/notas`
        const {data} = await api.post<string>(url,formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
        throw error
        }
    }
