import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'

type AddTaskModalProps = {
    open: boolean
    onClose: () => void
}

export default function AddTaskModal({ open, onClose }: AddTaskModalProps) {
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
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}
