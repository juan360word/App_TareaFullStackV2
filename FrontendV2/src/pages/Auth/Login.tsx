import Error from "@/Components/Error"
import type { UsuarioLogin } from "@/types/type"
import { useForm} from 'react-hook-form'
import { Link, useNavigate } from "react-router-dom"
import { useMutation} from '@tanstack/react-query'
import { AuthUser } from "@/services/AuthApi"
import { toast } from "react-toastify"





export default function LoginForm() {
    const navigate = useNavigate()
    const initialValues: UsuarioLogin = {
        email: '',
        pws: '',
      }
      const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })
    
      const { mutate} = useMutation({
        mutationFn:AuthUser,
        onError:(error) => {
            toast.error(error.message)
        },
        onSuccess:() => {
            toast.success('Inicio de sesión exitoso')
            navigate('/')
        }
      })

      const handleLogin = (_formData: UsuarioLogin) => mutate(_formData)

      
      
    return (
        <form action="" onSubmit={handleSubmit(handleLogin)}>

        
        <div className="flex items-center justify-center ">
            <div className="flex flex-col gap-2.5 px-8 pb-4 bg-panel-bg rounded-[25px] transition-all duration-400 hover:scale-105 hover:border hover:border-border-soft min-w-[550px]">

                <p className="text-center my-8 tracking-widest  text-white text-3xl font-medium">Inicia Sesion</p>

                <div className="flex items-center gap-2 rounded-[25px] p-2.5" style={{ boxShadow: 'inset 2px 5px 10px rgb(5,5,5)' }}>
                    <svg className="h-5 w-5 fill-white shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                        <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z" />
                    </svg>
                    <input autoComplete="off" placeholder="Username"  type="text" className="bg-transparent border-none outline-none w-full text-text-muted text-sm"
                    {...register("email", {
                        required: "El Email es obligatorio",
                        pattern: {
                          value: /\S+@\S+\.\S+/,
                          message: "E-mail no válido",
                        }
                        })}
                       
                    />
                    
                </div>
                {errors.email && (
                            <Error>{errors.email.message}</Error>
                          )}
                <div className="flex items-center gap-2 rounded-[25px] p-2.5" style={{ boxShadow: 'inset 2px 5px 10px rgb(5,5,5)' }}>
                    <svg className="h-5 w-5 fill-white shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                        <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                    </svg>
                    <input placeholder="Password" type="password" className="bg-transparent border-none outline-none w-full text-text-muted text-sm"
                    {...register("pws", {
                        required: "El Password es obligatorio",
                      })}
                    />
                 
                </div>
    {errors.pws && (
            <Error>{errors.pws.message}</Error>
          )}
                <div className="flex justify-center gap-2 mt-10">
                    <button className="px-4 py-2 rounded-[25px] bg-panel-bg text-white hover:bg-primary hover:text-input-text transition-colors duration-400 cursor-pointer">
                        Ingresar
                  
                    </button>
                    <button className="px-9 py-2 rounded-[25px] bg-panel-bg text-white hover:bg-primary hover:text-input-text transition-all duration-400  text-sm cursor-pointer">
                        <nav>
                            <Link to='/registro'>
                             Registarme
                            </Link>
                        </nav>
                       
                        </button>
                </div>

                <button className="mb-12 py-2 rounded-[25px] bg-card-bg text-white transition-all duration-400 hover:bg-red-600 text-sm cursor-pointer">
                        <nav>
                            <Link to='/olvidoClave'>
                                ¿Olvidaste tu contraseña?
                            </Link>
                        </nav>
                 
                </button>
            </div>
        </div>
        </form>
    )
}