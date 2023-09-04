import { Users } from "phosphor-react";
export function SideNavigation() {
  return (
    <aside className="w-[240px] h-screen flex flex-col py-4 gap-2 bg-white items-center shadow-sm">
      <div className='flex flex-col items-center justify-center mt-8 w-full gap-2'>
        <button 
          className='flex items-center justify-start gap-4 hover:bg-gray-50/60 w-full p-2 py-6'
        >
          <Users size={24} className='text-gray-200 font-extralight' weight="regular" />
          <span className='font-semibold text-gray-200 text-sm text-center'>Gerenciamento de usuário</span> 
        </button>
      </div>
    </aside>
  )
}