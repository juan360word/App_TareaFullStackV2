import type { Task } from "@/types/type"
import { Menu, Transition } from "@headlessui/react"
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid"
import { Fragment} from 'react'
import { useNavigate, useParams } from "react-router-dom"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { DeleteTarea } from "@/services/TareaService"
import { toast } from "react-toastify"
type cardprop = {
  tarea: Task
}





export default function CartaTarea({ tarea }: cardprop) {


  const params = useParams()
  const proyectoid = params.proyectoid!
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
  return (

    <>
      <li className="p-5  bg-[#1A191F] text-white flex justify-between">
        <div className="flex flex-col min-w-0 gap-y-4">
          <button type="button" className="text-xl font-bold text-left text-[#a7a9be]" >
            {tarea.name}
            <p className="text-[#a7a9be]">{tarea.description}</p>
          </button>
        </div>

        <div>
          <div className="flex shrink-0  gap-x-6">
            <Menu as="div" className="relative flex-none">
              <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                <span className="sr-only">opciones</span>
                <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
              </Menu.Button>
              <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
                <Menu.Items
                  className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                  <Menu.Item>
                    <button type='button' onClick={() => navigate(location.pathname + `?VerTareaid=${tarea._id}`)} className='block px-3 py-1 text-sm leading-6 text-gray-900'>
                      Ver Tarea
                    </button>
                  </Menu.Item>
                  <Menu.Item>
                    <button type='button' onClick={() => navigate(location.pathname + `?editTareaid=${tarea._id}`)} className='block px-3 py-1 text-sm leading-6 text-gray-900'>
                      Editar Tarea
                    </button>
                  </Menu.Item>

                  <Menu.Item>
                    <button type='button' onClick={() => mutate({proyectoid,tareaid: tarea._id})} className='block px-3 py-1 text-sm leading-6 text-red-500'>
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
