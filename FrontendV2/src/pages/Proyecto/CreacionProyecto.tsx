import { Link, useNavigate } from "react-router-dom"
import {useForm} from 'react-hook-form'
import ProjectForm from "../../Components/Proyecto/formProyecto"
import type { proyectoData } from "../../types/type"
import {CreateProyecto} from '../../services/proyectoAPI'
import { toast } from "react-toastify"
import { useMutation } from "@tanstack/react-query"


const CreacionProyecto = () => {
    const navigate = useNavigate() 
    const valorIniciar : proyectoData ={
        proyectoName:"",
        clientename:"",
        description:""
    }
    const {register,handleSubmit,formState:{errors}} = useForm<proyectoData>({defaultValues: valorIniciar})

    const mutation = useMutation({
      mutationFn: CreateProyecto,
      onError: (error) => {
        toast.error(error.message)
      },
      onSuccess: (data) => {
        toast.success(data)
        navigate('/') 
      }
    })


    const HandleForm =  (fomrData: proyectoData) => {
         mutation.mutate(fomrData)
       
    }

  return (
    <>
    <div className="max-w-3xl mx-auto">

     <h1 className="text-5xl font-black text-white">Crear Proyecto</h1>
    <p className="text-2xl font-light text-[#a7a9be] mt-5">Llena el siguiente formulario</p>
    <nav className="my-5">
       <Link className="bg-[#1A191F] text-[#a7a9be] hover:bg-white hover:text-black  px-10 py-3 font-bold cursor-pointer transition-colors"
        to='/'>
        Volver a Proyectos
    </Link>  
    </nav>

    <form className="mt-10  shadow-white p-10 rounded-lg " action="" onSubmit={handleSubmit(HandleForm)} noValidate>
        <ProjectForm register={register} errors={errors}/>
        <input type="submit" 
        value="Crear Proyecto"
        className="w-full p-3 bg-[#1A191F] text-[#a7a9be]  hover:bg-white hover:text-black font-bold cursor-pointer transition-colors"
        />
       
    </form>
    </div>
    </>
  )
}

export default CreacionProyecto