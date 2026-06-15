import FormspwsToken from "@/Components/Auth/FormspwsToken"
import NewPasswordToken from "@/Components/Auth/NuevosTokens"
import { useState } from "react"
import { Link } from "react-router-dom"


const GenerarPWS = () => {
    const [token, setToken] = useState<string>('')
    const [codigo, setCodigo] = useState(false)

    const handleTokenComplete = (tokenCompleto: string) => {
        setToken(tokenCompleto)
        setCodigo(true)
    }
  return (
   <>
   <h1 className="text-5xl font-black text-white">Generar Contraseña</h1>
   <p className="text-2xl font-light text-[#a7a9be] mt-5">Ingresa el codigo de verificacion</p>
   
   
   {!codigo ? (
    <NewPasswordToken token={token} setToken={setToken} onTokenComplete={handleTokenComplete} />
   ) : (
    <FormspwsToken token={token} />
   )}
   
   <nav className="my-5 flex justify-center">
    <Link className="bg-[#1A191F]  text-[#a7a9be] hover:bg-white hover:text-black  px-10 py-3 font-bold cursor-pointer transition-colors"
    to='/'>
    Volver a Inicio
    </Link>
   </nav>
   </>
  )
}

export default GenerarPWS