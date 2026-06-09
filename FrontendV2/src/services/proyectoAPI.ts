import api from '@/lib/Axios'
import type {proyectoData} from '../types/type'
import { isAxiosError } from 'axios'



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