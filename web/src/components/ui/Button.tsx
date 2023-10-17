import { ButtonHTMLAttributes } from "react"

const variantsButton = {
  primary : 'text-white text-center bg-green-500 hover:bg-green-600 border border-green-500',
  secondary : 'text-white text-center bg-red-500 hover:bg-red-600 border border-red-500 ',
  outline : 'border-green-500 border text-green-500 bg-trnasparent'
}

const sizeButtons = {
  sm : 'text-sm h-9 p-4 text-xs',
  md : 'h-10 rounded-lg px-6 py-4 text-xs',
  bg : 'h-12 rounded-lg px-8 py-6',
  xl : 'h-16 rounded-lg px-12 py-10'
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
  size?: "sm" | "md" | "bg" | "xl",
  variant?: "primary" | "secondary" | "outline"
}

export function Button({isLoading,variant="primary",size="md",...props}:ButtonProps) {
  return (
    <button 
      {...props}
      disabled={isLoading}
      className={`${props.className} flex items-center justify-center rounded-lg text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 ${sizeButtons[size]} ${variantsButton[variant]} `}
    />
  )
}