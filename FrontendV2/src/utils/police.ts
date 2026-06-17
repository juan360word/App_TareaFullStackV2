import type { EquipoMiembros } from "@/types/type"

 export const isManager = (managerId: string | { _id: string }, UserId: string) => {
    if(typeof managerId === 'string'){
        return managerId === UserId
    }
    return managerId._id === UserId
}