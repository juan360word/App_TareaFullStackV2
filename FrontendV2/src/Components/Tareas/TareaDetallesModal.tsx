import { Fragment } from 'react';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { GetAPITareaID, UdpadateStats } from '@/services/TareaService';
import { toast } from 'react-toastify';
import { FormatoFecha } from '@/utils/utils';
import { useMutation } from '@tanstack/react-query';
import type { TaskEstado } from '@/types/type';


const DiccionarioTarea: { [key: string]: string } = {
    pendiente: 'Pendiente',
    enEspera: 'En Espera',
    enProgreso: 'En Progreso',
    enRevision: 'En Revision',
    completada: 'Completada'
}

export default function TaskModalDetails() {

    const QueryClient = useQueryClient()
    const location = useLocation()
    const params = useParams()
    const queryParams = new URLSearchParams(location.search)
    const tareaid = queryParams.get('VerTareaid')!
    const proyectoid = params.proyectoid!
    const navidate = useNavigate()

    const show = tareaid ? true : false

    const { data, isError, error } = useQuery({
        queryKey: ['TareaDetalles', tareaid],
        queryFn: () => GetAPITareaID({ proyectoid, tareaid }),
        enabled: !!tareaid,
        retry: 3
    })

    const {mutate} = useMutation({
        mutationFn : UdpadateStats ,
        onError: (error) => {
            
            toast.error(error.message)
        },
        onSuccess: (data) => {
            
           toast.success(data)
           QueryClient.invalidateQueries({queryKey:['TareaDetalles', tareaid]})
           QueryClient.invalidateQueries({queryKey:['proyecto', proyectoid]})
        }
    })

    const handle = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const estado = e.target.value as TaskEstado
        const data = {proyectoid,tareaid,estado}
        mutate(data)
    }

    if (isError) {
        toast.error(error.message, { toastId: 'error' })
        return <Navigate to={`/proyecto/${proyectoid}`} />
    }

    if (data) return (
        <>
            <Transition appear show={show} as={Fragment}>
                <Dialog  as="div" className="relative z-10" onClose={() => navidate(location.pathname, { replace: true })}>
                    <TransitionChild
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/60" />
                    </TransitionChild>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <TransitionChild
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <DialogPanel className="w-full max-w-4xl  transform overflow-hidden rounded-2xl bg-panel-bg text-left align-middle shadow-xl transition-all p-16">
                                    <p className='text-xl  text-primary  '>Agregada el: {FormatoFecha(data.createdAt)} </p>
                                    <p className='text-xl  text-text-muted'>Última actualización: {FormatoFecha(data.updatedAt)} </p>
                                    <DialogTitle
                                        as="h3"
                                        className="font-black text-4xl text-white my-5"
                                    >{data.name}
                                    </DialogTitle>
                                    <p className='text-xl text-text-muted mb-2'>Descripción: {data.description} { }</p>
                                    <div className='my-5 space-y-3 text-xl'>
                                        <label className='font-bold text-white '>Estado Actual: </label>
                                        <select name="" onChange={handle} defaultValue={data.estado} className='w-full mt-3 text-white bg-card-bg text-center rounded-xl mx-auto  p-2' id="">
                                            {Object.entries(DiccionarioTarea).map(([key, value]) => (
                                                <option key={key} value={key}>{value}</option>
                                            ))}
                                        </select>
                                    </div>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}