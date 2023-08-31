import { Users } from "phosphor-react";
import logoSvg from '../assets/jr-logo.svg'
export function SideNavigation() {
  return (
    <aside className="w-[360px] h-screen flex flex-col py-4 gap-2 bg-white items-center shadow">
      <span className="font-bold uppercase text-gray-300 text-center mt-12">Menu</span>
      <div className='flex flex-col items-center justify-center mt-8 w-full gap-2'>
        <button 
          className='flex items-center justify-start gap-4 hover:bg-gray-50/60 w-full p-2 py-6'
        >
          <Users size={28} className='text-gray-300 font-extralight' weight="fill" />
          <span className='font-semibold text-gray-300 text-center'>Gerenciamento de usuário</span> 
        </button>
      </div>
    </aside>
  )
}