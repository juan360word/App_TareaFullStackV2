import api from "@/lib/Axios";
import type { Proyecto, TareaData } from "@/types/type";
import { AxiosError, isAxiosError } from "axios";

type tareaAPI = {
    formdata:TareaData
    proyectoid: Proyecto['_id']
}

export async function TareaService({formdata,proyectoid} : tareaAPI) {
  try {
    const url = `/Proyectos/${proyectoid}/tareas`
    const {data} = await api.post<String>(url,formdata)
    return data
  } catch (error) {
    if(isAxiosError(error) && error.response){
        throw new Error(error.response.data.error)
    }
  }
}
