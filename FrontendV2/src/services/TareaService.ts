import api from "@/lib/Axios";
import type { Proyecto, TareaData, Task } from "@/types/type";
import { isAxiosError } from "axios";
import  {TareaSchema}  from "@/types/type";
import * as v from 'valibot'



type tareaAPI = {
    formdata:TareaData
    proyectoid: Proyecto['_id']
    tareaid?: Task['_id']
    estado?:Task['estado']
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

export async function GetAPITareaID({proyectoid,tareaid}: Pick<tareaAPI,'proyectoid' | 'tareaid'>) {
  try {
    const url = `/Proyectos/${proyectoid}/tareas/${tareaid}`
    const {data} = await api(url)
    const response = v.safeParse(TareaSchema, data)
    if(response.success){
    return response.output  // 👈 .output no .InferOutput
    }
    return data
  } catch (error) {
    if(isAxiosError(error) && error.response){
      throw new Error(error.response.data.error)
  }
  }
}

export async function UpdateTareaService({ formdata, proyectoid, tareaid }: tareaAPI) {
  try {
      const url = `/Proyectos/${proyectoid}/tareas/${tareaid}`
      const { data } = await api.put<string>(url, formdata)
      return data
  } catch (error) {
      if (isAxiosError(error) && error.response) {
          throw new Error(error.response.data.error)
      }
      throw new Error('Error al actualizar la tarea')
  }
}

export async function DeleteTarea({proyectoid,tareaid}: Pick<tareaAPI,'proyectoid' | 'tareaid'>) {
  try {
    const url = `/Proyectos/${proyectoid}/tareas/${tareaid}`
    const {data} = await api.delete<string>(url)
    return data
  } catch (error) {
    if(isAxiosError(error) && error.response){
      throw new Error(error.response.data.error)
  }
  }
}
export async function UdpadateStats({proyectoid,tareaid,estado}: Pick<tareaAPI,'proyectoid' | 'tareaid' | 'estado'>) {
  try {
    const url = `/Proyectos/${proyectoid}/tareas/${tareaid}/estado`
    const {data} = await api.post<string>(url,{estado})
    return data
  } catch (error) {
    if(isAxiosError(error) && error.response){
      throw new Error(error.response.data.error)
  }
  }
}





