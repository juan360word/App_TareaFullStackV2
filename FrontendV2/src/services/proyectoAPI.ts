import api from '@/lib/Axios'
import {DasboProyectoSchema, type proyectoData} from '../types/type'
import { isAxiosError } from 'axios'
import { safeParse } from 'valibot'



export async function CreateProyecto(formdata:proyectoData ) {
    try {
        const {data} = await api.post('/Proyectos', formdata)
        console.log(data)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
           throw new Error(error.response.data.error)
        }
     
    }
}

export async function GetProyecto( ) {
    try {
       const {data} = await api('/Projectos')
       const response = safeParse(DasboProyectoSchema,data)
       if(response.success){
        return response.output
       }
    } catch (error) {
        if(isAxiosError(error) && error.response){
           throw new Error(error.response.data.error)
        }
     
    }
}

