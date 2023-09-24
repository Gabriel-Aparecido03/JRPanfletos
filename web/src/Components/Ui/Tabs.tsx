import { ReactNode } from "react";

interface TabsType {
  children : ReactNode
}

export function Tabs({children }:TabsType) {
  return (
    <aside className="w-[280px] h-screen flex flex-col py-4 gap-2 bg-white items-center shadow-sm">
      <div className='flex flex-col items-center justify-center mt-8 w-full gap-2 p-2 h-full'>
        { children }
      </div>
    </aside>
  )
}