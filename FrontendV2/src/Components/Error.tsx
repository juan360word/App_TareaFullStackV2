import type { ReactNode } from "react"



function Error({children}: {children:ReactNode}) {
  return (
   <>
   <div className="text-center my-4 bg-red-300 text-red-700 font-bold p-3 rounded-2xl">
    {children}
   </div>
    
   </>
  )
}

export default Error