import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { Link } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { GetProyecto } from "@/services/proyectoAPI"


const Dashboard = () => {

  const { data, isError, isLoading } = useQuery({
    queryKey: ['Proyecto'],
    queryFn: GetProyecto
  })

  if (isLoading) {
    return 'Cargando..'

  }


  return (
    <>
      <h1 className="text-5xl font-black text-white">Mis Proyectos</h1>
      <p className="text-2xl font-light text-[#a7a9be] mt-5">Maneja y adminstra tus Proyectos</p>
      <nav className="my-5">
        <Link className="bg-[#1A191F] text-[#a7a9be] hover:bg-white hover:text-black  px-10 py-3 font-bold cursor-pointer transition-colors"
          to='/proyecto/creado'>
          Nuevo Proyecto
        </Link>
      </nav>

      {data.length ? (
        
        <ul role="list" className="divide-y divide-gray-100 border border-gray-100 mt-10 bg-white shadow-lg">
          {data.map((project) => (
            <li key={project._id} className="flex justify-between gap-x-6 px-5 py-10">
              <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto space-y-2">
                  <Link to={``}
                    className="text-gray-600 cursor-pointer hover:underline text-3xl font-bold"
                  >{project.proyectoName}</Link>
                  <p className="text-sm text-gray-400">
                    Cliente: {project.clientename}
                  </p>
                  <p className="text-sm text-gray-400">
                    {project.description}
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-x-6">
                <Menu as="div" className="relative flex-none">
                  <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                    <span className="sr-only">opciones</span>
                    <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
                  </Menu.Button>
                  <Transition as={Fragment} enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95">
                    <Menu.Items
                      className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
                    >
                      <Menu.Item>
                        <Link to={``}
                          className='block px-3 py-1 text-sm leading-6 text-gray-900'>
                          Ver Proyecto
                        </Link>
                      </Menu.Item>
                      <Menu.Item>
                        <Link to={``}
                          className='block px-3 py-1 text-sm leading-6 text-gray-900'>
                          Editar Proyecto
                        </Link>
                      </Menu.Item>
                      <Menu.Item>
                        <button
                          type='button'
                          className='block px-3 py-1 text-sm leading-6 text-red-500'
                          onClick={() => { }}
                        >
                          Eliminar Proyecto
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
        <p className=" test-center py-20"> No tiene Proyectos aun {''}
          <Link to={'/proyecto/creado'} className="text-[#a7a9be] font-bold">
            Crear Proyecto
          </Link>
        </p>
      )}

    </>
  )
}

export default Dashboard