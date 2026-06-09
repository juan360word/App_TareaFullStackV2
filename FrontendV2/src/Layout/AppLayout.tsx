import {Outlet} from 'react-router-dom'
import Logo from '../Components/Logo'
import NavMenu from '../Components/NavMenu'
import {ToastContainer,toast,Zoom } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


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
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition={Zoom}
    />

    
    </>
  )
}

export default AppLayout