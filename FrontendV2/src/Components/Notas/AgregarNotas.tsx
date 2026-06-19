
import type { NotaData } from '@/types/type'

import {useForm} from 'react-hook-form'
import Error from '../Error'
import {useMutation}  from '@tanstack/react-query'
import { CreacionNota } from '@/services/NotaApi'
import { toast } from 'react-toastify'
import { useLocation, useParams } from 'react-router-dom'

export const AgregarNotas = () => {
   
  const param = useParams()
  const location = useLocation()
  const proyectoId = param.proyectoId!
  
  const queryParams = new URLSearchParams(location.search)
  const tareaID = queryParams.get('VerTareaid')
  
  const inicialValues : NotaData = {
    contenido:''
  }
 


  const {register,handleSubmit,reset,formState:{errors}} =  useForm({defaultValues:inicialValues})

  

  const {mutate} = useMutation({
    mutationFn: CreacionNota,
    onError:(error) => {
      toast.error(error.message)
    },
    onSuccess:(data) => {
      toast.success(data)
      
    }
  })

const handleNOta = (formData:NotaData) => {
    mutate({proyectoId,tareaID,formData})
    reset()
  }
  return (
    <>
    <form  className="space-y-3"
    onSubmit={handleSubmit(handleNOta)}
    noValidate
    >
        <div className="flex flex-col gap-3">
            <label className=' text-white text-2xl' htmlFor="">Crear notas</label>
            <input
                id='contenido'
                type="text"
                placeholder="Aca va el contenido de la Nota"
                className="w-full p-3 border text-white rounded-2xl border-white"
                {...register('contenido',{
                   required:'El contenido es obligatorio'
                })}
            />
            {errors.contenido && (
              <Error>{errors.contenido?.message}</Error>
            )}
        </div>
        <input type="submit" value='Crear Nota' className=" w-1/2 mx-auto rounded-2xl flex cursor-pointer transition-colors bg-white hover:bg-green-800 font-black hover:text-black hover p-2 " />
    </form>
    </>
  )
}
