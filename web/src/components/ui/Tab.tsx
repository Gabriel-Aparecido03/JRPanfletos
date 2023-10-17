import { ReactNode } from "react";

interface TabType {
  onClick : () => void
  isSelected?: boolean
  icon?: ReactNode
  text : string
}

export function Tab({icon,isSelected=false,onClick,text  }:TabType) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center justify-start gap-4  w-full p-2 py-4 rounded-lg ${isSelected && 'bg-gray-50/60'}`}
    >
      { icon }
      <span className='font-semibold text-gray-300 text-sm text-center hover:underline'>{ text }</span> 
    </button>
  )
}