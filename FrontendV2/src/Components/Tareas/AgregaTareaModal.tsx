import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { useLocation, useParams } from 'react-router-dom'
import TaskForm from '../Proyecto/TareaForm'
import {useForm} from 'react-hook-form'
import type { TareaData } from '@/types/type'
import { useMutation } from '@tanstack/react-query'
import { TareaService } from '@/services/TareaService'
import { toast } from 'react-toastify'

type AddTaskModalProps = {
    open: boolean
    onClose: () => void
}

export default function AddTaskModal({ open, onClose }: AddTaskModalProps) {

    const location = useLocation()
    const queryParamas = new URLSearchParams(location.search)
    const modalTask = queryParamas.get('nuevaTarea')
    



    const {mutate} = useMutation({
        mutationFn: TareaService ,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            reset()
            onClose()
        }
    })

    const params = useParams()
    const proyectoid = params.proyectoid!


    const ValorInicial : TareaData = {
        name:'',
        description:''
    }


    const {register,handleSubmit,reset,formState:{errors}} = useForm({defaultValues: ValorInicial})


    const hanlde = (form: TareaData) => {
        mutate({
            formdata: form,      
            proyectoid        
        })
    }

    return (
        <Dialog open={open} onClose={onClose} className="relative z-50">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-black/60 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200"
            />

            <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4">
                    <DialogPanel
                        transition
                        className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-[#1A191F] text-left align-middle shadow-xl transition-all p-16 data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200"
                    >
                        <DialogTitle className="font-black text-white tracking-wider text-4xl my-6">
                            Nueva Tarea
                        </DialogTitle>

                        <p className="text-xl text-[#a7a9be] font-bold">
                            Llena el formulario y crea{' '}
                            <span className="text-[#ff8906]">una tarea</span>
                        </p>

                        <form action="" onSubmit={handleSubmit(hanlde)} noValidate className='mt-10 space-y-3'>
                        
                        <TaskForm
                            register={register}
                            errors={errors}
                            />

                        <input
                         type="submit"
                         value="Guardar Cambios"
                         className="w-full p-3 bg-[#1A191F] text-[#a7a9be] hover:bg-white hover:text-black font-bold cursor-pointer transition-colors"
                        />

                            
                        </form>

                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}
