import { useForm } from "react-hook-form";
import type { UsuarioRegister } from "@/types/type";
import Error from "@/Components/Error";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { CreacionCuenta } from "@/services/AuthApi"; 
import { toast } from "react-toastify";

export default function Registro() {
  
    const initialValues: UsuarioRegister = {
      name: '',
      email: '',
      pws: '',
      pws_confirmacion: '',
    }
  
    const { register, handleSubmit, watch,reset, formState: { errors } } = useForm<UsuarioRegister>({ defaultValues: initialValues });
  
    const password = watch('pws');
  
    const handleRegister = (formData: UsuarioRegister) => {
      mutate(formData)
    }
  
    const {mutate} = useMutation({
      mutationFn: CreacionCuenta,
      onError: (error) => {
        toast.error(error.message)
      },
      onSuccess: (data) => {
        toast.success(data)
        reset()
      }
    })


    return (
        <form action="" onSubmit={handleSubmit(handleRegister)} noValidate>

       
      <div className="flex items-center justify-center">
        <div className="flex flex-col gap-2.5 px-8 pb-4 bg-[#171717] rounded-[25px] transition-all duration-400 hover:scale-105 hover:border hover:border-black min-w-[550px]">
  
          <p className="text-center my-8 tracking-widest text-white text-3xl font-medium">Crear Cuenta</p>
  
          {/* Email */}
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
                  pattern: { value: /\S+@\S+\.\S+/, message: "E-mail no válido" }
                })}
              />
            </div>
            {errors.email && <Error>{errors.email.message}</Error>}
          </div>
  
          {/* Nombre */}
          <div className="flex flex-col gap-2">
            <label className="text-[#a7a9be] text-sm uppercase font-bold pl-2">Nombre</label>
            <div className="flex items-center gap-2 rounded-[25px] p-2.5" style={{ boxShadow: 'inset 2px 5px 10px rgb(5,5,5)' }}>
              <i className="ti ti-user text-white text-lg" aria-hidden="true"/>
              <input
                type="text"
                placeholder="Nombre de Registro"
                className="bg-transparent border-none outline-none w-full text-[#d3d3d3] text-sm"
                {...register("name", { required: "El Nombre de usuario es obligatorio" })}
              />
            </div>
            {errors.name && <Error>{errors.name.message}</Error>}
          </div>
  
          {/* Password */}
          <div className="flex flex-col gap-2">
            <label className="text-[#a7a9be] text-sm uppercase font-bold pl-2">Password</label>
            <div className="flex items-center gap-2 rounded-[25px] p-2.5" style={{ boxShadow: 'inset 2px 5px 10px rgb(5,5,5)' }}>
              <i className="ti ti-lock text-white text-lg" aria-hidden="true"/>
              <input
                type="password"
                placeholder="Password de Registro"
                className="bg-transparent border-none outline-none w-full text-[#d3d3d3] text-sm"
                {...register("pws", {
                  required: "El Password es obligatorio",
                  minLength: { value: 8, message: 'El Password debe ser mínimo de 8 caracteres' }
                })}
              />
            </div>
            {errors.pws && <Error>{errors.pws.message}</Error>}
          </div>
  
          {/* Repetir Password */}
          <div className="flex flex-col gap-2">
            <label className="text-[#a7a9be] text-sm uppercase font-bold pl-2">Repetir Password</label>
            <div className="flex items-center gap-2 rounded-[25px] p-2.5" style={{ boxShadow: 'inset 2px 5px 10px rgb(5,5,5)' }}>
              <i className="ti ti-lock text-white text-lg" aria-hidden="true"/>
              <input
                type="password"
                placeholder="Repite Password de Registro"
                className="bg-transparent border-none outline-none w-full text-[#d3d3d3] text-sm"
                {...register("pws_confirmacion", {
                  required: "Repetir Password es obligatorio",
                  validate: value => value === password || 'Los Passwords no son iguales'
                })}
              />
            </div>
            {errors.pws_confirmacion && <Error>{errors.pws_confirmacion.message}</Error>}
          </div>
  
          {/* Botón */}
          <div className="flex justify-center mt-6 mb-8">
            <input
              type="submit"
              value="Registrarme"
              className="w-full py-3 rounded-[25px] bg-[#252525] text-white hover:bg-white hover:text-black transition-colors duration-400 font-bold text-lg cursor-pointer"
            />
          </div>
            <nav className="text-center flex items-center hover:bg-slate-900 text-white justify-center gap-2 rounded-[25px] p-2.5 m-2 " style={{ boxShadow: 'inset 2px 5px 10px rgb(5,5,5)' }}  m-2>
                <Link to='/login' className="   font-normal">
                ¿Ya tienes cuenta?
                </Link>
            </nav>
        </div>
      </div>
      </form>
    )
  }