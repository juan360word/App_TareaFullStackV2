import type { Reenviocodigo } from "@/types/type";
import {useForm} from 'react-hook-form'

const ReenvioCodigo = () => {

    const initialValues: Reenviocodigo = {
        email: ''
    }

    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues });

    const handleRequestCode = (formData: Reenviocodigo ) => {}


  return (
    <form
    <div className="flex items-center justify-center">
      <div className="flex flex-col gap-2.5 px-8 pb-8 bg-[#0f0e17] rounded-[25px] min-w-[550px]">

        {/* Header */}
        <div className="text-center mt-8 mb-4">
          <h1 className="text-[#ff8906] text-4xl font-black">AdTareas</h1>
        </div>

        {/* Card */}
        <div className="bg-[#1a191f] rounded-2xl p-8 mt-4">
          <h2 className="text-white text-2xl font-bold mb-2">¿No recibiste el código?</h2>
          <p className="text-[#a7a9be] text-base mb-6">
            Ingresa tu email y te enviaremos un nuevo código de confirmación
          </p>

          {/* Input email */}
          <div className="bg-[#0f0e17] border-2 border-[#ff8906] rounded-xl p-4 mb-6 flex items-center gap-3">
            <i className="ti ti-mail text-[#ff8906] text-xl" aria-hidden="true"/>
            <input
              type="email"
              placeholder="tu@email.com"
              className="bg-transparent border-none outline-none text-[#d3d3d3] text-base w-full"
            />
          </div>

          {/* Botón */}
          <button className="w-full py-4 rounded-[25px] bg-[#ff8906] text-[#0f0e17] font-black text-lg hover:opacity-90 transition-opacity cursor-pointer">
            Reenviar código
          </button>

          {/* Warning */}
          <p className="text-[#a7a9be] text-sm text-center mt-5">
            ⚠️ El nuevo código expirará en <span className="text-[#ff8906] font-bold">6 minutos</span>
          </p>
        </div>

        {/* Footer */}
        <p className="text-[#a7a9be] text-xs text-center my-4">
          © 2026 AdTareas · Todos los derechos reservados
        </p>

      </div>
    </div>
  )
}

export default ReenvioCodigo