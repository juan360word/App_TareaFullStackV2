import { isAxiosError } from "axios";
import api from "@/lib/Axios";
import type { EquipoMiembros, EquipoMiembrosForm, Proyecto } from "@/types/type";
import { safeParse } from "valibot";
import { EquipoArregloSchema } from "@/types/type";

export async function EncontrarMiembro({proyectoId,formdata} : {proyectoId: Proyecto['_id'],formdata:EquipoMiembrosForm}) {
    try {
        const url = `/Proyectos/${proyectoId}/members/find`
        const {data} = await api.post(url, formdata)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
        throw error
    }
}

export async function AddUsuarioAlProyecto({proyectoId,id} : {proyectoId: Proyecto['_id'],id:EquipoMiembros['_id']}) {
    try {
        const url = `/Proyectos/${proyectoId}/members`
        const {data} = await api.post(url, {id})
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
        throw error
    }
}

export async function Get(proyectoId: Proyecto['_id']) {
    try {
        const url = `/Proyectos/${proyectoId}/members`
        const {data} = await api.get(url)
        const response = safeParse(EquipoArregloSchema, data)
        if(response.success){
            return response.output
        }
        return []
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
        throw error
    }
}

export async function RemoveMiembro({proyectoId, userId}: {proyectoId: Proyecto['_id'], userId: EquipoMiembros['_id']}) {
    try {
        const url = `/Proyectos/${proyectoId}/members/${userId}`
        const {data} = await api.delete(url)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
        throw error
    }
}