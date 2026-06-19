
import type { Nota } from '@/types/type'

export const DetallesNotas = ({nota}: {nota: Nota}) => {
  return (
    <div className="py-4 text-white">
      <p>{nota.contenido}</p>
      <p className="text-sm text-text-muted">{nota.creadoby?.name}</p>
    </div>
  )
}
