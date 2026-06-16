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
   <div className="flex flex-col items-center">
     <p className="text-center my-4 tracking-widest text-white text-3xl font-medium">Restablecer Contraseña</p>
   </div>
   
   {!codigo ? (
    <NewPasswordToken token={token} setToken={setToken} onTokenComplete={handleTokenComplete} />
   ) : (
    <FormspwsToken token={token} />
   )}
   
   <nav className="flex justify-center mt-6 mb-4">
    <Link
      className="w-full max-w-[550px] text-center  text-white font-normal rounded-[25px] p-2.5 transition-colors"
      style={{ boxShadow: 'inset 2px 5px 10px rgb(5,5,5)' }}
      to='/'
    >
      Volver a Inicio
    </Link>
   </nav>
   </>
  )
}

export default GenerarPWS