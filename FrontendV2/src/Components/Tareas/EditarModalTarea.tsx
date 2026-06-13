import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import type { TareaData, Task } from '@/types/type';
import TaskForm from '../Proyecto/TareaForm';
import { UpdateTareaService } from '@/services/TareaService';

type EditTaskModalProps = {
    open: boolean
    onClose: () => void
    data: Task,
    tareaid:Task['_id']
}

export default function EditTaskModal({ open, onClose,data,tareaid }: EditTaskModalProps) {

    const params = useParams()
    const proyectoid = params.proyectoid!
    const queryClient = useQueryClient()

    const ValorInicial: TareaData = {
        name: data.name,
        description: data.description
    }

    const { register, handleSubmit, reset, formState: { errors } } = useForm<TareaData>({
        defaultValues: ValorInicial
    })

    const { mutate } = useMutation({
        mutationFn:UpdateTareaService ,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['proyecto', proyectoid] })
            queryClient.invalidateQueries({ queryKey: ['tarea', tareaid] })
            toast.success(data)
            reset()
            onClose()
        }
    })

   

    const editHandle = (formdata: TareaData) => {
        const data = {
            proyectoid,
            tareaid,formdata
        }
        mutate(data)
    }
    

    return (
        <Transition appear show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/60" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-[#1A191F] text-left align-middle shadow-xl transition-all p-16">
                                <Dialog.Title as="h3" className="font-black text-white text-4xl my-5">
                                    Editar Tarea
                                </Dialog.Title>

                                <p className="text-xl font-bold text-[#a7a9be]">
                                    Realiza cambios a una tarea en{' '}
                                    <span className="text-[#ff8906]">este formulario</span>
                                </p>

                                <form
                                    className="mt-10 space-y-3"
                                    onSubmit={handleSubmit(editHandle)}
                                    noValidate
                                >
                                    <TaskForm register={register} errors={errors} />

                                    <input
                                        type="submit"
                                        className="w-full p-3 mt-3 rounded-xl bg-[#131219] text-[#a7a9be] hover:bg-white hover:text-black font-bold cursor-pointer transition-colors"
                                        value="Guardar Tarea"
                                    />
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}