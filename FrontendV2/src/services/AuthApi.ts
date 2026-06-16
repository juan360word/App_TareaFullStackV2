import api from "@/lib/Axios";
import { isAxiosError } from "axios";
import type { olvidoclave, UsuarioLogin, UsuarioRegister, NewPasswordForm } from "@/types/type";
import type { confirmacionToken} from '../types/type.ts'
import type { Reenviocodigo } from "@/types/type";

function extraerError(error: unknown): string {
  if (isAxiosError(error) && error.response) {
    const errData = error.response.data as Record<string, unknown>;
    if (errData?.error) {
      if (Array.isArray(errData.error)) {
        return errData.error.map((e: { msg?: string }) => e.msg ?? 'Error de validación').join(', ');
      }
      return String(errData.error);
    }
  }
  return 'Error desconocido';
}

export async function CreacionCuenta(formData: UsuarioRegister) {
    try {
        const url = `/auth/create-cuenta`
        const {data} = await api.post<string>(url,formData)
        return data
    } catch (error) {
        throw new Error(extraerError(error));
    }
}
export async function ConfirmacionCta({ token }: confirmacionToken) {
    try {
        const url = `/auth/confirmacion-cuenta`
        const {data} = await api.post<string>(url,{token})
        return data
    } catch (error) {
        throw new Error(extraerError(error));
    }
}

export async function reenvioCodigo( token :Reenviocodigo ) {
    try {
        const url = `/auth/reenvioCode`
        const {data} = await api.post<string>(url,token)
        return data
    } catch (error) {
        throw new Error(extraerError(error));
    }
}
export async function AuthUser( formData : UsuarioLogin ) {
    try {
        const url = `/auth/login`
        const {data} = await api.post<{token: string}>(url,formData)
        localStorage.setItem('Auth_token_tarea',data.token)
        return data.token
    } catch (error) {
        throw new Error(extraerError(error));
    }
}
export async function olvidoClave( formData :olvidoclave ) {
    try {
        const url = `/auth/olvidoClave`
        const {data} = await api.post<string>(url,formData)
        return data
    } catch (error) {
        throw new Error(extraerError(error));
    }
}
export async function confirmacionToken( {token} :confirmacionToken ) {
    try {
        const url = `/auth/confirmacionToken`
        const {data} = await api.post<string>(url,{token})
        return data
    } catch (error) {
        throw new Error(extraerError(error));
    }
}
export async function actualizarPWS( token :string, formData :NewPasswordForm ) {
    try {
        const url = `/auth/actualizarPWS/${token}`
        const {data} = await api.post<string>(url,formData)
        return data
    } catch (error) {
        throw new Error(extraerError(error));
    }
}
export async function Getuser() {
    try {
        const {data} = await api('/auth/user')
        return data
    } catch (error) {
        throw new Error(extraerError(error));
    }
}

