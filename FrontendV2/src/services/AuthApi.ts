import api from "@/lib/Axios";
import { isAxiosError } from "axios";
import type { olvidoclave, UsuarioLogin, UsuarioRegister, NewPasswordForm } from "@/types/type";
import type { confirmacionToken} from '../types/type.ts'
import type { Reenviocodigo } from "@/types/type";


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
export async function ConfirmacionCta({ token }: confirmacionToken) {
    try {
        const url = `/auth/confirmacion-cuenta`
        const {data} = await api.post<string>(url,{token})
        return data
    } catch (error) {
        if(isAxiosError(error) && error.message ){
            throw new Error(error.response.data.error);
            
        }
    }
}

export async function reenvioCodigo( token :Reenviocodigo ) {
    try {
        const url = `/auth/reenvioCode`
        const {data} = await api.post<string>(url,token)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.message ){
            throw new Error(error.response.data.error);
            
        }
    }
}
export async function AuthUser( formData :UsuarioLogin ) {
    try {
        const url = `/auth/login`
        const {data} = await api.post<string>(url,formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.message ){
            throw new Error(error.response.data.error);
            
        }
    }
}
export async function olvidoClave( formData :olvidoclave ) {
    try {
        const url = `/auth/olvidoClave`
        const {data} = await api.post<string>(url,formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.message ){
            throw new Error(error.response.data.error);
            
        }
    }
}
export async function confirmacionToken( {token} :confirmacionToken ) {
    try {
        const url = `/auth/confirmacionToken`
        const {data} = await api.post<string>(url,{token})
        return data
    } catch (error) {
        if(isAxiosError(error) && error.message ){
            throw new Error(error.response.data.error);
        }
    }
}
export async function actualizarPWS( token :string, formData :NewPasswordForm ) {
    try {
        const url = `/auth/actualizarPWS/${token}`
        const {data} = await api.post<string>(url,formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.message ){
            throw new Error(error.response.data.error);
        }
    }
}


