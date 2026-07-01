import {useDroppable} from '@dnd-kit/core'

type DropTasl = {
    status: string
}

const DropTask = ({status}:DropTasl) => {
    const {setNodeRef} = useDroppable({
        id:status
    })
  return (
    <div ref={setNodeRef} className=" text-xs font-semibold uppercase p-2 border border-dashed border-slate-500 mt-5 grid place-content-center text-slate-500">
        Soltar tarea aca
    </div>
  )
}

export default DropTask