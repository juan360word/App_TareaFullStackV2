import {Outlet} from 'react-router-dom'
import Logo from '../Components/Logo'
import NavMenu from '../Components/NavMenu'

const AppLayout = () => {
  return (
    
    <>

    <header className=' py-5'>
        <div className='max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center'>
            <div className='w-64'>
             <Logo/>
         </div>
         <NavMenu/>
        </div>
    </header>

    
    <section className='max-w-screen-2xl mx-auto mt-10 p-5'>
         <Outlet/>
    </section>
   
    <footer className='py-5'>
        <p className=' text-white text-center'>
            Los derechos de esta pagina estan reservados {new Date().getFullYear()}
        </p>
    </footer>
    </>
  )
}

export default AppLayout