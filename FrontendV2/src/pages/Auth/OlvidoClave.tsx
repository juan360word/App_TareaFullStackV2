import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Error from "@/Components/Error";
import type { olvidoclave } from "@/types/type";
import {useMutation} from '@tanstack/react-query'
import { olvidoClave } from "@/services/AuthApi";
import { toast } from "react-toastify";


export default function OlvidoClave() {
  const navigate = useNavigate()
  const initialValues: olvidoclave = {
    email: ''
  }
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues });

  const {mutate} = useMutation({
    mutationFn:olvidoClave,
    onError:(error) => {
        toast.error(error.message)
    },
    onSuccess:(data) => {
        toast.success(data)
        reset()
        navigate('/login')
    }
  })
  
  const handleForgotPassword = (formData: olvidoclave) => mutate(formData)


  return (
    <form onSubmit={handleSubmit(handleForgotPassword)} noValidate>
      <div className="flex items-center justify-center">
        <div className="flex flex-col gap-2.5 px-8 pb-4 bg-[#171717] rounded-[25px] transition-all duration-400 hover:scale-105 hover:border hover:border-black min-w-[550px]">

          <p className="text-center my-8 tracking-widest text-white text-3xl font-medium">Reestablecer Password</p>

          <div className="flex flex-col gap-2">
            <label className="text-[#a7a9be] text-sm uppercase font-bold pl-2">Email</label>
            <div className="flex items-center gap-2 rounded-[25px] p-2.5" style={{ boxShadow: 'inset 2px 5px 10px rgb(5,5,5)' }}>
              <i className="ti ti-mail text-white text-lg" aria-hidden="true"/>
              <input
                type="email"
                placeholder="Email de Registro"
                className="bg-transparent border-none outline-none w-full text-[#d3d3d3] text-sm"
                {...register("email", {
                  required: "El Email de registro es obligatorio",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "E-mail no válido",
                  },
                })}
              />
            </div>
            {errors.email && <Error>{errors.email.message}</Error>}
          </div>

          <div className="flex justify-center mt-6 mb-8">
            <input
              type="submit"
              value="Enviar Instrucciones"
              className="w-full py-3 rounded-[25px] bg-[#252525] text-white hover:bg-white hover:text-black transition-colors duration-400 font-bold text-lg cursor-pointer"
            />
          </div>

          <nav className="text-center flex flex-col gap-2 mb-4">
            <Link
              to='/login'
              className="hover:bg-slate-900 text-white font-normal rounded-[25px] p-2.5 transition-colors"
              style={{ boxShadow: 'inset 2px 5px 10px rgb(5,5,5)' }}
            >
              ¿Ya tienes cuenta? Iniciar Sesión
            </Link>
            <Link
              to='/registro'
              className="hover:bg-slate-900 text-white font-normal rounded-[25px] p-2.5 transition-colors"
              style={{ boxShadow: 'inset 2px 5px 10px rgb(5,5,5)' }}
            >
              ¿No tienes cuenta? Crea una
            </Link>
          </nav>
        </div>
      </div>
    </form>
  )
}