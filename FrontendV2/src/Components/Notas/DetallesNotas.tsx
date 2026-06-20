
import { useAuth } from '@/hooks/useAuth'
import { EliminacionNota } from '@/services/NotaApi'
import type { Nota } from '@/types/type'
import { FormatoFecha } from '@/utils/utils'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

export const DetallesNotas = ({nota}: {nota: Nota}) => {

  const param = useParams()
  const proyectoId = param.proyectoid!
  const location = useLocation()
  const QueryParam = new URLSearchParams(location.search)
  const tareaID = QueryParam.get('VerTareaid')

  const {data,isLoading} = useAuth()
  const Query = useQueryClient()
  const Delete = useMemo(() => data?._id === nota.creadoby._id, [data])
  if(isLoading) return 'Cargando...'
 
  const {mutate} = useMutation({
    mutationFn:EliminacionNota,
    onError:(error) => {
      toast.error(error.message)
    },
    onSuccess:(data) => {
      toast.success(data)
      Query.invalidateQueries({queryKey:['TareaDetalles',tareaID]})
    }
  })
 
 
  return (
    <div className="py-4  text-white m-3">
      <p>{nota.contenido}</p>
      <p className="text-sm text-text-muted">{nota.creadoby?.name}</p>
      <p className='text-green-500  text-xl'>
        {FormatoFecha(nota.createdAt)}
      </p>
      {Delete && (
         <div className='flex justify-end hover:text-red-500 ml-auto'>
         <button className='text-xl  cursor-pointer' onClick={() => mutate({proyectoId,tareaID,notaid: nota._id})}>Eliminar</button>
      </div>
      ) 
      }
     
       

    </div>
  )
}
