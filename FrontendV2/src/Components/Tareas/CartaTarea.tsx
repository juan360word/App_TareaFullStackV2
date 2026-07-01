import type { Task } from "@/types/type"
import { Menu, Transition } from "@headlessui/react"
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid"
import { Fragment} from 'react'
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { DeleteTarea } from "@/services/TareaService"
import { toast } from "react-toastify"
import {useDraggable} from '@dnd-kit/core'


type cardprop = {
  tarea: Task
}





export default function CartaTarea({ tarea }: cardprop) {

  const {attributes,listeners,setNodeRef,transform} = useDraggable({
    id: tarea._id
  })
  const params = useParams()
  const proyectoid = params.proyectoid!
  const location = useLocation()
 const QueryClient = useQueryClient()
  const {mutate} = useMutation({
    mutationFn : DeleteTarea ,
    onError: (error) => {
        toast.error(error.message)
    },
    onSuccess: (data) => {
        toast.success(data)
        QueryClient.invalidateQueries({queryKey:['proyecto', proyectoid]})
    }
})

  const navigate = useNavigate()
  const style = transform ? {
    transform:`translate3d(${transform.x}px,${transform.y}px,0)`
  }: undefined
  return (

    <>
      <li ref={setNodeRef} {...listeners} {...attributes} style={style} className="p-5 bg-panel-bg text-white flex justify-between gap-4">
        <div className="flex flex-col min-w-0 gap-y-4 flex-1">
          
          <button type="button" className="text-xl text-white  font-bold text-left text-text-muted break-words" >
            {tarea.name}
            <p className="text-text-muted ">{tarea.description}</p>
          </button>
        </div>

        <div>
          <div className="flex shrink-0  gap-x-6">
            <Menu as="div" className="relative flex-none">
              <Menu.Button className="-m-2.5 block p-2.5 text-text-soft hover:text-text-main">
                <span className="sr-only">opciones</span>
                <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
              </Menu.Button>
              <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
                <Menu.Items
                  className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-panel-bg py-2 shadow-lg ring-1 ring-border-soft focus:outline-none">
                  <Menu.Item>
                    <button type='button' onClick={() => navigate(location.pathname + `?VerTareaid=${tarea._id}`)} className='block px-3 py-1 text-sm leading-6 text-primary hover:text-primary'>
                      Ver Tarea
                    </button>
                  </Menu.Item>
                  <Menu.Item>
                    <button type='button' onClick={() => navigate(location.pathname + `?editTareaid=${tarea._id}`)} className='block px-3 py-1 text-sm leading-6 text-primary hover:text-primary'>
                      Editar Tarea
                    </button>
                  </Menu.Item>

                  <Menu.Item>
                    <button type='button' onClick={() => mutate({proyectoid,tareaid: tarea._id})} className='block px-3 py-1 text-sm leading-6 text-red-500 hover:text-primary'>
                      Eliminar Tarea
                    </button>
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </li>

    </>
  )
}
