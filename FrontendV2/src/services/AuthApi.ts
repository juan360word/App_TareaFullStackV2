import api from "@/lib/Axios";
import { isAxiosError } from "axios";
import type { UsuarioRegister } from "@/types/type";

export async function CreacionCuenta(formData: UsuarioRegister) {
    try {
        const url = `/auth/create-cuenta`
        const {data} = await api.post<string>(url,formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.message ){
            throw new Error(error.response.data.error);
            
        }
    }
}

