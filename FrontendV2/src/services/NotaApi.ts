import { isAxiosError } from "axios";
import api from "@/lib/Axios";
import type { Nota, NotaData, Proyecto, Task } from "@/types/type";


type NotaType = {
    formData: NotaData,
    proyectoId:Proyecto['_id'],
    tareaID:Task['_id'],
    notaid:Nota['_id']
}



export async function CreacionNota({formData,proyectoId,tareaID}: Pick<NotaType,'formData' | 'proyectoId' | 'tareaID'>) {
    try {
        const url = `/Proyectos/${proyectoId}/tareas/${tareaID}/notas`
        const {data} = await api.post<{msg: string}>(url,formData)
        return data.msg
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
        throw error
    }
}

export async function EliminacionNota({proyectoId,tareaID,notaid}: Pick<NotaType,'notaid' | 'proyectoId' | 'tareaID'>) {
    try {
         const url = `/Proyectos/${proyectoId}/tareas/${tareaID}/notas/${notaid}`
         const {data} = await api.delete(url)
         return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
        throw error
    }
}

