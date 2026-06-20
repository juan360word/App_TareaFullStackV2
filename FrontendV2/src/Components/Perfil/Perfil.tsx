import { useAuth } from "@/hooks/useAuth"
import FormPerfil from "./Form"


export default function Perfil() {
    const {data,isLoading} = useAuth()

    if(isLoading) return 'Cargando..'

    if(data) return <FormPerfil data={data}/>
}
