import { Spinner } from "phosphor-react"
import { ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text? : string
  isLoading?: boolean
}

export function Button({isLoading,text,...props}:ButtonProps) {
  return (
    <button 
      disabled={isLoading}
      className="flex items-center justify-center rounded-lg bg-green-500 text-white font-bold  text-base text-center cursor-pointer p-2 h-[52px] hover:bg-green-600 transition-all delay-50 disabled:cursor-not-allowed disabled:bg-green300 disabled:"
      {...props}
    >
    { !isLoading  && text}
    { isLoading  && <Spinner className="animate-spin" /> }
    </button>
  )
}