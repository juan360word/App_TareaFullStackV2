import type { ActualizarPWS, UserPerfil } from "@/types/type"
import { isAxiosError } from "axios"
import api from "@/lib/Axios"



export async function ActualizarPerfil(formData:UserPerfil) {
    try {
      const {data} = await api.put<string>('/auth/perfil', formData)
      return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
        throw error
    }
}
export async function ChasePws(formData:ActualizarPWS) {
    try {
      const {data} = await api.post<string>('/auth/ActualizarPWS', formData)
      return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
        throw error
    }
}