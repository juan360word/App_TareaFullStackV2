import { useState } from "react"
import { Link } from "react-router-dom"
import { useMutation } from '@tanstack/react-query'
import { toast } from "react-toastify"
import { ConfirmacionCta } from '../../services/AuthApi'


const ConfirmarcionCuenta = () => {

    const [token, settoken] = useState<string>('')

    const { mutate } = useMutation({
        mutationFn: ConfirmacionCta,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
        }
    })

    const handle = (e: React.ChangeEvent<HTMLInputElement>) => {
        settoken(e.target.value)
    }

    const hanldeSubmit = () => {
        mutate({ token: token })
    }

  return (
    <>
     <div className="flex items-center justify-center">
      <div className="flex flex-col gap-2.5 px-8 pb-8 bg-[#0f0e17] rounded-[25px] transition-all duration-400 hover:scale-105 hover:border hover:border-black min-w-[550px]">

        
        <div className="text-center mt-8 mb-4">
          <h1 className="text-[#ff8906] text-4xl font-black">AdTareas</h1>
          <p className="text-[#a7a9be] text-sm mt-1">Gestiona tus proyectos con estilo</p>
        </div>

        
        <div className="bg-[#1a191f] rounded-2xl p-8 mt-4">
          <h2 className="text-white text-2xl font-bold mb-4">Confirma tu cuenta</h2>
          <p className="text-[#a7a9be] text-base mb-6">
            Ingresa el código de 6 dígitos que enviamos a tu correo
          </p>

         
          <div className="bg-[#0f0e17] border-2 border-[#ff8906] rounded-xl p-5 text-center mb-6">
            <p className="text-[#a7a9be] text-sm mb-3">Tu código de confirmación</p>
            <input
              type="text"
              maxLength={6}
              placeholder="000000"
              className="bg-transparent border-none outline-none text-[#ff8906] text-4xl font-black tracking-[.5em] text-center w-full"
              value={token}  
              onChange={handle}
            />
          </div>

        
          <button onClick={hanldeSubmit} className="w-full py-4 rounded-[25px] bg-[#ff8906] text-[#0f0e17] font-black text-lg hover:opacity-90 transition-opacity cursor-pointer">
            Confirmar mi cuenta
          </button>
           
          <p className="text-[#a7a9be] text-sm text-center mt-5">
            ⚠️ Este código expira en <span className="text-[#ff8906] font-bold">6 minutos</span>. Si no solicitaste esto, ignora este mensaje.
          </p>
        </div>


        <nav className="mt-10 flex flex-col space-y-4">
        <Link
          to='/reenvioCode'
          className="text-center hover:text-[#ff8906] text-gray-300 font-normal"
       >
          Solicitar un nuevo Código
        </Link>
      </nav>

        {/* Footer */}
        <p className="text-[#a7a9be] text-xs text-center my-4">
          © 2026 AdTareas · Todos los derechos reservados
        </p>

      </div>
    </div>
    </>
  )
}

export default ConfirmarcionCuenta