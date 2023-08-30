import { Spinner } from "phosphor-react"
import { ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text? : string
  isLoading?: boolean
  size?: 'lg' | 'md'
}

export function Button({isLoading,text,size = "md",...props}:ButtonProps) {
  return (
    <button 
      disabled={isLoading}
      className={`flex items-center justify-center rounded-lg bg-green-500 text-white font-bold ${size === "lg" ? 'text-base' : 'text-sm'} text-base text-center cursor-pointer p-2 h-[${size === "lg" ? '52px' : '48px'}] hover:bg-green-600 transition-all delay-50 disabled:cursor-not-allowed disabled:bg-green300`}
      {...props}
    >
    { !isLoading  && text}
    { isLoading  && <Spinner className="animate-spin" /> }
    </button>
  )
}