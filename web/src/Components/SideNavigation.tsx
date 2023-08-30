import { UserCircleGear } from "phosphor-react";
import logoSvg from '../assets/logo.svg'
export function SideNavigation() {
  return (
    <aside className="w-[400px] h-screen flex flex-col py-4 gap-2 bg-green-700">
      <img src={logoSvg} alt="logo Jr panfletos" />
      <div className='flex flex-col gap-4 w-[calc(100%-20px)] items-center justify-center'>
        <a 
          href="" 
          className='bg-none w-full text-sm cursor-pointer flex items-center justify-center gap-4 hover:bg-white/5 transition-opacity delay-100 py-2'
        >
          <UserCircleGear size={28} className='text-white' />
          <span className='font-bold text-white text-center w-1/2'>Gerenciamento de usuário</span> 
        </a>
        <a 
          href="" 
          className='bg-none w-full text-sm cursor-pointer flex items-center justify-center gap-4 hover:bg-white/5 transition-opacity delay-100 py-2'
        >
          <UserCircleGear size={28} className='text-white' />
          <span className='font-bold text-white text-center w-1/2'>Gerenciamento de usuário</span> 
        </a>
        <a 
          href="" 
          className='bg-none w-full text-sm cursor-pointer flex items-center justify-center gap-4 hover:bg-white/5 transition-opacity delay-100 py-2'
        >
          <UserCircleGear size={28} className='text-white' />
          <span className='font-bold text-white text-center w-1/2'>Gerenciamento de usuário</span> 
        </a>
        <a 
          href="" 
          className='bg-none w-full text-sm cursor-pointer flex items-center justify-center gap-4 hover:bg-white/5 transition-opacity delay-100 py-2'
        >
          <UserCircleGear size={28} className='text-white' />
          <span className='font-bold text-white text-center w-1/2'>Gerenciamento de usuário</span> 
        </a>
      </div>
    </aside>
  )
}