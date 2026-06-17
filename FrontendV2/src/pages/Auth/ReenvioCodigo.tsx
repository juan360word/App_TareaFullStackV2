import { reenvioCodigo } from "@/services/AuthApi";
import type { Reenviocodigo } from "@/types/type";
import { useMutation } from "@tanstack/react-query";
import {useForm} from 'react-hook-form'
import {toast} from 'react-toastify'


const ReenvioCodigo = () => {

    const initialValues: Reenviocodigo = {
        email: ''
    }

    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues });

    const {mutate} = useMutation({
      mutationFn:reenvioCodigo,
      onError: (error) => {
        toast.error(error.message)
      },
      onSuccess: (data) => {
        toast.success(data)
        reset()
      }
   })

    const handleRequestCode = (formData: Reenviocodigo ) => {mutate(formData)}

  return (
   <form action="" onSubmit={handleSubmit(handleRequestCode)}>

   
    <div className="flex items-center justify-center">
      <div className="flex flex-col gap-2.5 px-8 pb-8 bg-app-bg rounded-[25px] min-w-[550px]">

       
        <div className="text-center mt-8 mb-4">
          <h1 className="text-primary text-4xl font-black">AdTareas</h1>
        </div>

        
        <div className="bg-panel-bg rounded-2xl p-8 mt-4">
          <h2 className="text-white text-2xl font-bold mb-2">¿No recibiste el código?</h2>
          <p className="text-text-muted text-base mb-6">
            Ingresa tu email y te enviaremos un nuevo código de confirmación
          </p>

          
          <div className="bg-app-bg border-2 border-primary rounded-xl p-4 mb-6 flex items-center gap-3">
            <i className="ti ti-mail text-primary text-xl" aria-hidden="true"/>
            <input
              type="email"
              placeholder="tu@email.com"
              className="bg-transparent border-none outline-none text-text-muted text-base w-full"
              {...register('email', { required: 'El email es obligatorio' })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          
          <button className="w-full py-4 rounded-[25px] bg-primary text-app-bg font-black text-lg hover:opacity-90 transition-opacity cursor-pointer">
            Reenviar código
          </button>

          
          <p className="text-text-muted text-sm text-center mt-5">
            ⚠️ El nuevo código expirará en <span className="text-primary font-bold">6 minutos</span>
          </p>
        </div>

        
        <p className="text-text-muted text-xs text-center my-4">
          © 2026 AdTareas · Todos los derechos reservados
        </p>

      </div>
    </div>
    </form>
  )
}

export default ReenvioCodigo