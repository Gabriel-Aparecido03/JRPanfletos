import { InputHTMLAttributes,ReactNode } from "react"

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  startIconAdornments? : ReactNode
  endIconAdornments?: ReactNode
}

export function TextField({startIconAdornments,endIconAdornments,...props}:TextFieldProps) {
  return (
    <div className="border-solid border-gray-200 border-2 rounded-lg p-2 flex items-center justify-between">
      {startIconAdornments}
      <input 
        {...props}
        className="w-full p-2 outline-none bg-transparent text-gray-950 placeholder:text-gray-400 text-sm" 
      />
      {endIconAdornments}
    </div>
  )
}