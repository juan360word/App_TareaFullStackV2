
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"


export function FormatoFecha(isoString:string) {
    const date = new Date(isoString)
    const formato= new Intl.DateTimeFormat('es-Es',{
        year:'numeric',
        month:'long',
        day:'numeric'
    })
    return formato.format(date)
}


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}