import api from '@/lib/Axios'
import type {proyectoData} from '../types/type'



export async function CreateProyecto(formdata:proyectoData ) {
    try {
        const {data} = await api.post('/proyectos',formdata)
        console.log(data)
    } catch (error) {
        console.log(error)
    }
}