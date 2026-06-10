import api from '@/lib/Axios'
import {DasboProyectoSchema, type Proyecto, type proyectoData} from '../types/type'
import { isAxiosError } from 'axios'
import { safeParse } from 'valibot'

function getApiError(error: unknown, fallback = 'Ocurrió un error') {
    if (isAxiosError(error) && error.response?.data?.error) {
        const apiError = error.response.data.error

        if (Array.isArray(apiError)) {
            return apiError.map((item: { msg?: string }) => item.msg).filter(Boolean).join(', ')
        }

        if (typeof apiError === 'string') {
            return apiError
        }
    }

    return fallback
}

export async function CreateProyecto(formdata:proyectoData ) {
    try {
        const {data} = await api.post('/Proyectos', formdata)
        console.log(data)
        return data
    } catch (error) {
        throw new Error(getApiError(error))
    }
}

export async function GetProyecto( ) {
    try {
        console.log('GetProyecto llamado')  // 👈
       const {data} = await api('/Proyectos')
       const response = safeParse(DasboProyectoSchema,data)
       if(response.success){
        return response.output
       }else{
        throw new Error('Datos inválidos') 
       }
    } catch (error) {
        throw new Error(getApiError(error, 'Error al obtener los proyectos'))
    }
}
export async function GetProyectoid( id:Proyecto['_id']) {
    try {
        const { data } = await api(`/Proyectos/${id}`)
        return data as Proyecto
    } catch (error) {
        throw new Error(getApiError(error, 'Error al obtener el proyecto'))
    }
}

export async function UpdateProyecto({ id, formdata }: { id: Proyecto['_id']; formdata: proyectoData }) {
    try {
        console.log('ID:', id)          
        console.log('Data:', formdata)
        const { data } = await api.put(`/Proyectos/${id}`, formdata)
        return data
    } catch (error) {
        throw new Error(getApiError(error, 'Error al actualizar el proyecto'))
    }
}

export async function DeleteProyecto( id:Proyecto['_id']) {
    try {
        const { data } = await api.delete(`/Proyectos/${id}`)
        return data as string 
    } catch (error) {
        throw new Error(getApiError(error, 'Error al eliminar el proyecto'))
    }
}


