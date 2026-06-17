import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { Link } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { DeleteProyecto, GetProyecto } from "@/services/proyectoAPI"
import { useMutation,useQueryClient } from '@tanstack/react-query'
import {toast} from 'react-toastify'
import { TextAnimateTitulo } from '@/Components/Animaciones/Texto'
import { useAuth } from '@/hooks/useAuth'
import { isManager } from '@/utils/police'




const Dashboard = () => {

  const {data:user, isLoading:authLo} = useAuth()

  const { data, isLoading, error } = useQuery({
    queryKey: ['Proyecto'],
    queryFn: GetProyecto,
    retry:false,
    staleTime: 0,
    refetchOnMount: true,    
    refetchOnWindowFocus: true  
  })

  const queryclient = useQueryClient()

  
   const {mutate} = useMutation({
    mutationFn: DeleteProyecto,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
      queryclient.invalidateQueries({queryKey:['Proyecto']})
    }
  })

  if (isLoading && authLo)  return (
   <p className='text-white text-2xl text-center'>Cargando..</p> 
  ) 
  
 if (error) return (<p className='text-white text-2xl text-center'>Error: {(error as Error).message} </p> ) 

 

 if(data && user) return (
    <>
      <h1 className="text-5xl font-black text-black"><TextAnimateTitulo/></h1>
      <p className="text-2xl font-light text-text-muted mt-5">Maneja y adminstra tus Proyectos</p>
      <nav className="my-5">
        <Link className="bg-panel-bg text-text-muted hover:bg-primary hover:text-input-text px-10 py-3 font-bold cursor-pointer transition-colors"
          to='/proyecto/creado'>
          Nuevo Proyecto
        </Link>
      </nav>

      {data?.length ? (
        
        <ul role="list" className="divide-y rounded-2xl border mt-10 bg-panel-bg shadow-lg">
          {data.map((project) => (

            <li key={project._id} className="flex justify-between  px-5 py-10">
              <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto space-y-2">
                  {
                   isManager(project.Admin,user._id) ?
                    <p className='font-bold text-xs uppercase bg-green-800 text-white border-white w-40 border-2 rounded-lg  py-1 px-5'>Administrador</p> :
                    <p className='font-bold text-xs uppercase bg-red-800 text-white border-white w-47 border-2 rounded-lg  py-1 px-5'>Miembro del Equipo</p>
                  }
                  <Link to={`/proyecto/${project._id}`}
                    className="text-primary cursor-pointer hover:underline text-3xl font-bold"
                  >{project.proyectoName}</Link>
                  <p className="text-sm text-text-muted">
                    Cliente: {project.clientename}
                  </p>
                  <p className="text-sm text-text-muted">
                    {project.description}
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-x-6">
                <Menu as="div" className="relative flex-none">
                    <Menu.Button className="-m-2.5 block p-2.5 text-text-soft hover:text-primary">
                    <span className="sr-only">opciones</span>
                    <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
                  </Menu.Button>
                  <Transition as={Fragment} enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95">
                    <Menu.Items
                      className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md  bg-panel-bg py-2 shadow-lg ring-1 ring-border-soft focus:outline-none"
                    >
                      <Menu.Item>
                        <Link to={`/proyecto/${project._id}`}
                          className='block px-3 py-1 text-sm leading-6 text-primary hover:text-primary'>
                          Ver Proyecto
                        </Link>
                      </Menu.Item>
                      {  isManager(project.Admin,user._id) && (
                        <>
                        
                        <Menu.Item>
                        <Link to={`/proyecto/${project._id}/creado`}
                          className='block px-3 py-1 text-sm leading-6 text-primary hover:text-primary'>
                          Editar Proyecto
                        </Link>
                      </Menu.Item>
                      <Menu.Item>
                        <button
                          type='button'
                          className='block px-3 py-1 text-sm leading-6 text-red-500 hover:text-primary'
                          onClick={() => mutate(project._id)}
                        >
                          Eliminar Proyecto
                        </button>
                      </Menu.Item>
                        </>
                      )}
                      
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </li>
          ))}
        </ul>

      ) : (
        <p className=" text-center text-black text-2xl py-20"> No tiene Proyectos aun, {''}
          <Link to={'/proyecto/creado'} className=" text-primary font-bold">
            Crear Proyecto
          </Link>
        </p>
      )}

    </>
  )
}

export default Dashboard