import type { Task } from "@/types/type"
import { AgregarNotas } from "./AgregarNotas"
import { DetallesNotas } from "./DetallesNotas"

type PanelTypes = {
  nota: Task['notas']
}

export const PanelNotas = ({nota}:PanelTypes) => {
  return (
    <div className="space-y-6">
      <AgregarNotas/>
      <div className="mt-10 divide-y divide-white/20">
        {nota.length ? (
          <>
            <p className="font-bold text-2xl my-5 text-white">
              Notas:
            </p>
            {nota.map((item, idx) => <DetallesNotas key={idx} nota={item}/>)}
          </>
        ) : <p className='text-white'>No hay Notas</p>}
      </div>
    </div>
  )
}
