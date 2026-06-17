import AgregarEquipoModal from '@/Equipo/AgregarEquipoModal'
import { Link, useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Get, RemoveMiembro } from '@/services/EquipoAPI';
import { Navigate } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';
import { Fragment } from 'react/jsx-runtime';
import { toast } from 'react-toastify';
import { TextAnimateMimebros } from '@/Components/Animaciones/Texto';

const MiembrosQuien = () => {
  const navigate = useNavigate()
  const param = useParams()
  const proyectoid = param.proyectoid!
  const queryClient = useQueryClient()
  const {data,isError,isLoading} = useQuery({
    queryKey:['Equipo',proyectoid],
    queryFn:() => Get(proyectoid),
    retry:false
  })

  const { mutate } = useMutation({
    mutationFn: RemoveMiembro,
    onError:(error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
      queryClient.invalidateQueries({queryKey:['Equipo',proyectoid]})
    }
  })

  if(isLoading) return 'cargando..'
  if(isError) return <Navigate to={'/404'}/>

  if(data)return (
    <>
     <h1 className="text-5xl text-black font-black"><TextAnimateMimebros/></h1>
                <p className="text-text-muted text-2xl font-light mt-6">Maneja quien esta en tu proyecto</p>

                <nav className="my-5 flex gap-3.5">
                    <button
                        type="button"
                        onClick={() => navigate(location.pathname + '?addMiembro=true')}
                        className="px-8 py-4 bg-panel-bg hover:bg-primary hover:text-input-text transition-colors text-white text-xl font-bold cursor-pointer"
                    >
                        Agregar Equipo/Miembro
                    </button>
                    <Link to={`/proyecto/${proyectoid}`} className="px-8 py-4 bg-panel-bg hover:bg-primary hover:text-input-text transition-colors text-white text-xl font-bold cursor-pointer">
                   Volver al proyecto
                    </Link>
                </nav>
                <h2 className="text-5xl text-black font-black my-10">Miembros actuales</h2>
            {data.length ? (
                <ul role="list" className="divide-y divide-border-soft border border-soft mt-10 bg-panel-bg shadow-lg rounded-lg">
                    {data?.map((member) => (
                        <li key={member._id} className="flex justify-between gap-x-6 px-5 py-10">
                            <div className="flex min-w-0 gap-x-4">
                                <div className="min-w-0 flex-auto space-y-2">
                                    <p className="text-2xl font-black text-white">
                                        {member.name}
                                    </p>
                                    <p className="text-sm text-text-muted">
                                       {member.email}
                                    </p>
                                </div>
                            </div>
                            <div className="flex shrink-0 items-center gap-x-6">
                                <Menu as="div" className="relative flex-none">
                                    <Menu.Button className="-m-2.5 block p-2.5 text-text-muted hover:text-white">
                                            <span className="sr-only">opciones</span>
                                            <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
                                    </Menu.Button>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-card-bg py-2 shadow-lg ring-1 ring-border-soft focus:outline-none">
                                            <Menu.Item>
                                                <button
                                                    type='button'
                                                    onClick={() => mutate({ proyectoId: proyectoid, userId: member._id }) }
                                                    className='block px-3 py-1 text-sm leading-6 text-red-400 hover:bg-white/10 w-full text-left'
                                                >
                                                    Eliminar del Proyecto
                                                </button>
                                            </Menu.Item>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className='text-center py-20 text-text-muted'>No hay miembros en este equipo</p>
            )}
            <AgregarEquipoModal/>
    </>
  )
}

export default MiembrosQuien